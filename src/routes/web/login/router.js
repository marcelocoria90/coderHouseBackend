import { Router } from 'express'
import * as loginController from '../../../controllers/web/web.controllers.js'

export const loginRouter = Router()

loginRouter.get('/', loginController.loginView)
