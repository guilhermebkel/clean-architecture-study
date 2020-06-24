import { SignUpController } from '../../../../../presentation/controllers/login/signup/SignUpController'
import { Controller } from '../../../../../presentation/protocols'
import { makeSignUpValidation } from './SignUpValidationFactory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/DbAuthenticationFactory'
import { makeDbAddAccount } from '../../../usecases/account/addAccount/DbAddAccountFactory'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'

export const makeSignUpController = (): Controller => {
  const signUpValidation = makeSignUpValidation()

  const dbAddAccount = makeDbAddAccount()

  const dbAuthentication = makeDbAuthentication()

  const signUpController = new SignUpController(
    dbAddAccount,
    signUpValidation,
    dbAuthentication
  )

  const logControllerDecorator = makeLogControllerDecorator(signUpController)

  return logControllerDecorator
}
