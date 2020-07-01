import { Router } from 'express'

import { makeAddSurveyController } from '../factories/controllers/survey/addSurvey/AddSurveyControllerFactory'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeLoadSurveysController } from '../factories/controllers/survey/loadSurveys/LoadSurveysControllerFactory'
import { adminAuth, auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
