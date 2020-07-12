import { Router } from 'express'

import { adaptRoute } from '@/main/adapters/ExpressRouteAdapter'
import { auth } from '@/main/middlewares'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/surveyResult/saveSurveyResult/SaveSurveyResultControllerFactory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
