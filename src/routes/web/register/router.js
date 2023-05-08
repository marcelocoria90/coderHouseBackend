import { Router } from 'express'
import * as registerController from '../../../controllers/web/web.controllers.js'

export const registerRouter = Router()

registerRouter.get('/', registerController.registerView)
