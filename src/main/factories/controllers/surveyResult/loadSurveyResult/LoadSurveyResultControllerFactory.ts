import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory'
import { LoadSurveyResultController } from '@/presentation/controllers/surveyResult/loadSurveyResult/LoadSurveyResultController'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/surveyResult/loadSurveyResult/DbLoadSurveyResultFactory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/loadSurveyById/DbLoadSurveyByIdFactory'

export const makeLoadSurveyResultController = (): Controller => {
  const dbLoadSurveyById = makeDbLoadSurveyById()
  const dbSaveSurveyResult = makeDbLoadSurveyResult()

  const loadSurveyResultController = new LoadSurveyResultController(
    dbLoadSurveyById,
    dbSaveSurveyResult
  )

  const logControllerDecorator = makeLogControllerDecorator(loadSurveyResultController)

  return logControllerDecorator
}
