import { Router } from 'express'
import * as usersController from '../../../controllers/api/users/users.controller.js'

export const usersRouter = Router()

usersRouter.post('/', usersController.postUser)
