import 'dotenv/config'
import express from 'express'
import session from '../middlewares/session.js'
import { engine } from 'express-handlebars'

import { cnx } from '../services/databases/mongodb/mongoose.js'
import { apiRouter } from '../routes/api/api.routes.js'
import { viewsRouter } from '../routes/web/views.routes.js'

const app = express()

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('views', './views')
app.set('view engine', '.hbs')

app.use(express.static('./public'))
app.use(express.json())
app.use(session)

cnx()

app.use('/api', apiRouter)
app.use('/web', viewsRouter)

export default app
