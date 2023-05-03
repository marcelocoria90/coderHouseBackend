import express, { Router } from 'express'
import { usersRouter } from './users/users.routes.js'
import { sessionsRouter } from './sessions/sessions.routes.js'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use('/usuarios', usersRouter)
apiRouter.use('/sesiones', sessionsRouter)
