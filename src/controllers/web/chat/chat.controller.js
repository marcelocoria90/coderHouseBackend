import { request, response } from 'express'
// import { Message } from '../dao/entities/Message.js'
import { messagesService as MM } from '../../../services/daos/manager/messages/messages.services.js'

/**
 * @param {request} req
 * @param {response} res
 * @returns {Promise<void>}
 * @router /chat
 * @description Obtiene los mensajes del chat y los envía al cliente por medio del renderizado de la vista chat
 */
const renderMessages = async (req = request, res = response) => {
  try {
    const messages = await MM.getList()
    res.render('chat', { pageTitle: 'Mensajes 💬', messages })
  } catch (e) {
    res.status(500).json({ ERROR: `${e.message}` })
  }
}

const newMessage = async (req, res, next) => {
  try {
    const data = req.body
    const result = await MM.save(data)
    // console.log(result)
    res.json(result)
  } catch (e) {
    res.status(404).json(e.message)
    next()
  }
}

export {
  renderMessages,
  newMessage
}
