import { Router } from 'express'

import { makeAddSurveyController } from '../factories/controllers/addSurvey/AddSurveyControllerFactory'
import { adaptRoute } from '../adapters/express/ExpressRouteAdapter'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
