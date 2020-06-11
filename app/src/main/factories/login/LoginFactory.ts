import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/LoginController'
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator'
import { makeLoginValidation } from './LoginValidationFactory'
import { LogMongoRepository } from '../../../infra/db/mongodb/logRepository/LogMongoRepository'
import { BcryptAdapter } from '../../../infra/cryptography/bcryptAdapter/BcryptAdapter'
import { JwtAdapter } from '../../../infra/cryptography/jwtAdapter/JwtAdapter'
import { DbAuthentication } from '../../../data/usecases/Authentication/DbAuthentication'
import { AccountMongoRepository } from '../../../infra/db/mongodb/accountRepository/AccountMongoRepository'
import env from '../../config/env'

export const makeLoginController = (): Controller => {
  const SALT = 12

  const bcryptAdapter = new BcryptAdapter(SALT)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const logMongoRepository = new LogMongoRepository()
  const loginValidation = makeLoginValidation()
  const accountMongoRepository = new AccountMongoRepository()

  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )

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
