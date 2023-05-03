import { Router } from 'express'
import * as sessionsController from '../../../controllers/api/sesions/sessions.controller.js'

export const sessionsRouter = Router()

sessionsRouter.post('/', sessionsController.postSesiones)
sessionsRouter.delete('/', sessionsController.deleteSesiones)
