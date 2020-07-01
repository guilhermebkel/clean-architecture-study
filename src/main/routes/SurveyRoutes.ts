import { Router } from 'express'

import { makeAddSurveyController } from '../factories/controllers/survey/addSurvey/AddSurveyControllerFactory'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddlewareFactory'
import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { makeLoadSurveysController } from '../factories/controllers/survey/loadSurveys/LoadSurveysControllerFactory'

export default (router: Router): void => {
  const adminAuthMiddleware = adaptMiddleware(makeAuthMiddleware('admin'))
  const authMiddleware = adaptMiddleware(makeAuthMiddleware())

  router.post('/surveys', adminAuthMiddleware, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', authMiddleware, adaptRoute(makeLoadSurveysController()))
}
