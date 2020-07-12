import { SignUpController } from '@/presentation/controllers/login/signup/SignUpController'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from '@/main/factories/controllers/login/signup/SignUpValidationFactory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/DbAuthenticationFactory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/addAccount/DbAddAccountFactory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/LogControllerDecoratorFactory'

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
