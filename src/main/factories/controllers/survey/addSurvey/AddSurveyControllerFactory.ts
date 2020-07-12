import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory'
import { AddSurveyController } from '@/presentation/controllers/survey/addSurvey/AddSurveyController'
import { makeAddSurveyValidation } from './AddSurveyValidationFactory'
import { makeDbAddSurvey } from '@/main/factories/usecases/survey/addSurvey/DbAddSurveyFactory'

export const makeAddSurveyController = (): Controller => {
  const dbAddSurvey = makeDbAddSurvey()
  const addSurveyValidation = makeAddSurveyValidation()

  const addSurveyController = new AddSurveyController(
    addSurveyValidation,
    dbAddSurvey
  )

  const logControllerDecorator = makeLogControllerDecorator(addSurveyController)

  return logControllerDecorator
}
