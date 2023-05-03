import { Router } from 'express'
import * as loginController from '../../../controllers/web/login/login.controller.js'

export const loginRouter = Router()

loginRouter.get('/', loginController.loginView)
