import app from './app/app.js'
import { Server as SocketIOServer } from 'socket.io'
import { messagesService } from './services/daos/manager/messages/messages.services.js'

const PORT = process.env.PORT || 3000

export const httpServer = app.listen(PORT, () => {
  console.log(`⚡server running on port⚡ ${PORT} 🚀`)
})

const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
  console.log(`🚀New client connected: ${clientSocket.id}🚀`)

  clientSocket.on('newMessage', async message => {
    await messagesService.save(message)
    const messages = await messagesService.getList()

    const messagesFront = messages.map(m => ({
      ...m
    }))

    io.emit('updateMessages', messagesFront)
  })

  clientSocket.on('newUser', async user => {
    clientSocket.broadcast.emit('newUser', user)
  })

  const messages = await messagesService.getList()
  const messagesFront = messages.map(m => ({
    ...m
  }))

  io.sockets.emit('updateMessages', messagesFront)
})

app.use((req, res, next) => {
  req.io = io
  next()
})
