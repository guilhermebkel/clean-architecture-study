import { Controller } from '../../../../../presentation/protocols'
import { LoginController } from '../../../../../presentation/controllers/login/login/LoginController'
import { makeLoginValidation } from './LoginValidationFactory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/DbAuthenticationFactory'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'

export const makeLoginController = (): Controller => {
  const loginValidation = makeLoginValidation()

  const dbAuthentication = makeDbAuthentication()

  const loginController = new LoginController(
    dbAuthentication,
    loginValidation
  )

  const logControllerDecorator = makeLogControllerDecorator(loginController)

  return logControllerDecorator
}
