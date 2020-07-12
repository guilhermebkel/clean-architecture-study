import { Router } from 'express'

import { makeAddSurveyController } from '@/main/factories/controllers/survey/addSurvey/AddSurveyControllerFactory'
import { adaptRoute } from '@/main/adapters/ExpressRouteAdapter'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/loadSurveys/LoadSurveysControllerFactory'
import { adminAuth, auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
