import express, { Router } from 'express'
import { chatRouter } from './chat/router.js'
import { profileRouter } from './profile/router.js'
import { registerRouter } from './register/router.js'
import { loginRouter } from './login/router.js'

export const viewsRouter = Router()

viewsRouter.use(express.json())
viewsRouter.use(express.urlencoded({ extended: true }))

viewsRouter.use('/chat', chatRouter)
viewsRouter.use('/perfil', profileRouter)
viewsRouter.use('/registro', registerRouter)
viewsRouter.use('/login', loginRouter)
