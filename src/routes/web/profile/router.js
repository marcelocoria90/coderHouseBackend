import { Router } from 'express'
import { authJwtView } from '../../../middlewares/authentication.js'
import * as profileController from '../../../controllers/web/web.controllers.js'

export const profileRouter = Router()

profileRouter.get('/', authJwtView, profileController.homeView)
