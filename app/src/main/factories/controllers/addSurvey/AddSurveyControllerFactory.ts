import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory'
import { AddSurveyController } from '../../../../presentation/controllers/survey/addSurvey/AddSurveyController'
import { makeAddSurveyValidation } from './AddSurveyValidationFactory'
import { makeDbAddSurvey } from '../../usecases/addSurvey/DbAddSurveyFactory'

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
