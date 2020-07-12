import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory'
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/loadSurveys/DbLoadSurveysFactory'
import { LoadSurveysController } from '@/presentation/controllers/survey/loadSurveys/LoadSurveysController'

export const makeLoadSurveysController = (): Controller => {
  const dbLoadSurveys = makeDbLoadSurveys()

  const addSurveyController = new LoadSurveysController(
    dbLoadSurveys
  )

  const logControllerDecorator = makeLogControllerDecorator(addSurveyController)

  return logControllerDecorator
}
