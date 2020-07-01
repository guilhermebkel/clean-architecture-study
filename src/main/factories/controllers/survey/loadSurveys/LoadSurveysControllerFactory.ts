import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'
import { makeDbLoadSurveys } from '../../../usecases/survey/loadSurveys/DbLoadSurveysFactory'
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/loadSurveys/LoadSurveysController'

export const makeLoadSurveysController = (): Controller => {
  const dbLoadSurveys = makeDbLoadSurveys()

  const addSurveyController = new LoadSurveysController(
    dbLoadSurveys
  )

  const logControllerDecorator = makeLogControllerDecorator(addSurveyController)

  return logControllerDecorator
}
