import { SignUpController } from '../../presentation/controllers/signup/SignUp'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { DbAddAccount } from '../../data/usecases/AddAccount/DbAddAccount'
import { BcryptAdapter } from '../../infra/cryptography/BcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/AccountRepository/Account'
import { LogMongoRepository } from '../../infra/db/mongodb/LogRepository/Log'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/Log'

export const makeSignUpController = (): Controller => {
  const SALT = 12

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(SALT)
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()

  const dbAddAccount = new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository
  )

  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )

  const logControllerDecorator = new LogControllerDecorator(
    signUpController,
    logMongoRepository
  )

  return logControllerDecorator
}
