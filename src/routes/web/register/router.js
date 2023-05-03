import { Router } from 'express'
import * as registerController from '../../../controllers/web/register/register.controller.js'

export const registerRouter = Router()

registerRouter.get('/', registerController.registerView)
