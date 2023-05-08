import express, { Router } from 'express'
import { usersRouter } from './users/router.js'
import { sessionsRouter } from './sesions/router.js'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use('/usuarios', usersRouter)
apiRouter.use('/sesiones', sessionsRouter)
