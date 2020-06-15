import { SignUpController } from '../../../../presentation/controllers/signup/SignUpController'
import { LogMongoRepository } from '../../../../infra/db/mongodb/logRepository/LogMongoRepository'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/LogControllerDecorator'
import { makeSignUpValidation } from './SignUpValidationFactory'
import { makeDbAuthentication } from '../../usecases/authentication/DbAuthenticationFactory'
import { makeDbAddAccount } from '../../usecases/addAccount/DbAddAccountFactory'

export const makeSignUpController = (): Controller => {
  const logMongoRepository = new LogMongoRepository()
  const signUpValidation = makeSignUpValidation()

  const dbAddAccount = makeDbAddAccount()

  const dbAuthentication = makeDbAuthentication()

  const signUpController = new SignUpController(
    dbAddAccount,
    signUpValidation,
    dbAuthentication
  )

  const logControllerDecorator = new LogControllerDecorator(
    signUpController,
    logMongoRepository
  )

  return logControllerDecorator
}
