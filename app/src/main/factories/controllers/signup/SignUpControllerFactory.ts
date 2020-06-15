import { SignUpController } from '../../../../presentation/controllers/signup/SignUpController'
import { DbAddAccount } from '../../../../data/usecases/AddAccount/DbAddAccount'
import { BcryptAdapter } from '../../../../infra/cryptography/bcryptAdapter/BcryptAdapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/accountRepository/AccountMongoRepository'
import { LogMongoRepository } from '../../../../infra/db/mongodb/logRepository/LogMongoRepository'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/LogControllerDecorator'
import { makeSignUpValidation } from './SignUpValidationFactory'
import { makeDbAuthentication } from '../../usecases/authentication/DbAuthenticationFactory'

export const makeSignUpController = (): Controller => {
  const SALT = 12

  const bcryptAdapter = new BcryptAdapter(SALT)
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()
  const signUpValidation = makeSignUpValidation()

  const dbAddAccount = new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository
  )

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
