import express from 'express'
import 'dotenv/config'
import { engine } from 'express-handlebars'

import { cnx } from '../services/databases/mongodb/mongoose.js'
import { viewsRouter } from '../routes/web/views.routes.js'

const app = express()

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('views', './views')
app.set('view engine', '.hbs')

app.use(express.static('./public'))
app.use(express.json())

cnx()

app.use('/web', viewsRouter)

export default app
