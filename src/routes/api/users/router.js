import { Router } from 'express'
import * as usersController from '../../../controllers/api/sesions/users.controller.js'

export const usersRouter = Router()

usersRouter.post('/', usersController.postSesiones)
