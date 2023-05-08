/* eslint-disable camelcase */
import { Router } from 'express'
import * as sessionsController from '../../../controllers/api/sesions/sessions.controller.js'
import { authenticationGithub_CB, authenticationGithub, authenticationLocal, authJwtApi } from '../../../middlewares/authentication.js'
import { afterLoginView } from '../../../controllers/web/web.controllers.js'

export const sessionsRouter = Router()

sessionsRouter.post('/', authenticationLocal, sessionsController.postSession)

sessionsRouter.get('/github', authenticationGithub)
sessionsRouter.get('/githubcallback',
  authenticationGithub_CB,
  afterLoginView
)

sessionsRouter.post('/logout', sessionsController.logoutSession)

sessionsRouter.get('/current',
  authJwtApi,
  sessionsController.getCurrentSession
)
