import { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/LoginController'
import { LogControllerDecorator } from '../../../decorators/LogControllerDecorator'
import { makeLoginValidation } from './LoginValidationFactory'
import { LogMongoRepository } from '../../../../infra/db/mongodb/logRepository/LogMongoRepository'
import { makeDbAuthentication } from '../../usecases/authentication/DbAuthenticationFactory'

export const makeLoginController = (): Controller => {
  const logMongoRepository = new LogMongoRepository()
  const loginValidation = makeLoginValidation()

  const dbAuthentication = makeDbAuthentication()

  const loginController = new LoginController(
    dbAuthentication,
    loginValidation
  )

  const logControllerDecorator = new LogControllerDecorator(
    loginController,
    logMongoRepository
  )

  return logControllerDecorator
}
