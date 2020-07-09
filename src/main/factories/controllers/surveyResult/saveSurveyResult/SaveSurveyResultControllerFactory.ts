import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'
import { SaveSurveyResultController } from '@/presentation/controllers/surveyResult/saveSurveyResult/SaveSurveyResultController'
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/surveyResult/saveSurveyResult/DbSaveSurveyResultFactory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/loadSurveyById/DbLoadSurveyByIdFactory'

export const makeSaveSurveyResultController = (): Controller => {
  const dbLoadSurveyById = makeDbLoadSurveyById()
  const dbSaveSurveyResult = makeDbSaveSurveyResult()

  const saveSurveyResultController = new SaveSurveyResultController(
    dbLoadSurveyById,
    dbSaveSurveyResult
  )

  const logControllerDecorator = makeLogControllerDecorator(saveSurveyResultController)

  return logControllerDecorator
}
