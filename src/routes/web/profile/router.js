import { Router } from 'express'
import * as profileController from '../../../controllers/web/profile/profile.controller.js'

export const profileRouter = Router()

profileRouter.get('/', profileController.profileView)
