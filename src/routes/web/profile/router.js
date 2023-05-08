import { Router } from 'express'
import * as profileController from '../../../controllers/web/web.controllers.js'

export const profileRouter = Router()

profileRouter.get('/', profileController.hemeView)
