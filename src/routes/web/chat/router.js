import { Router } from 'express'
import * as chatController from '../../../controllers/web/chat/chat.controller.js'

export const chatRouter = Router()

chatRouter.get('/', chatController.renderMessages)
