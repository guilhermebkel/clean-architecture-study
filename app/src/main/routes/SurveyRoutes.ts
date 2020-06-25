import { Router } from 'express'

import { makeAddSurveyController } from '../factories/controllers/survey/addSurvey/AddSurveyControllerFactory'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddlewareFactory'
import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'

export default (router: Router): void => {
  const adminAuthMiddleware = adaptMiddleware(makeAuthMiddleware('admin'))

  router.post('/surveys', adminAuthMiddleware, adaptRoute(makeAddSurveyController()))
}
