import { SignUpController } from '../../../presentation/controllers/signup/SignUp'
import { DbAddAccount } from '../../../data/usecases/AddAccount/DbAddAccount'
import { BcryptAdapter } from '../../../infra/cryptography/BcryptAdapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/AccountRepository/Account'
import { LogMongoRepository } from '../../../infra/db/mongodb/LogRepository/Log'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/Log'
import { makeSignUpValidation } from './SignUpValidation'

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

  const signUpController = new SignUpController(
    dbAddAccount,
    signUpValidation
  )

  const logControllerDecorator = new LogControllerDecorator(
    signUpController,
    logMongoRepository
  )

  return logControllerDecorator
}
