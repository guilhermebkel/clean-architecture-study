import { BcryptAdapter } from '../../../../../infra/cryptography/bcryptAdapter/BcryptAdapter'
import { JwtAdapter } from '../../../../../infra/cryptography/jwtAdapter/JwtAdapter'
import { DbAuthentication } from '../../../../../data/usecases/account/Authentication/DbAuthentication'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/accountRepository/AccountMongoRepository'
import env from '../../../../config/env'

export const makeDbAuthentication = (): DbAuthentication => {
  const SALT = 12

  const bcryptAdapter = new BcryptAdapter(SALT)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()

  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )

  return dbAuthentication
}
