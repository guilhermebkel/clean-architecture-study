import { Router } from 'express'

import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { auth } from '../middlewares'
import { makeSaveSurveyResultController } from '../factories/controllers/surveyResult/saveSurveyResult/SaveSurveyResultControllerFactory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
