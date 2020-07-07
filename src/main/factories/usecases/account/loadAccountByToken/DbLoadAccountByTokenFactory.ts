import { AccountMongoRepository } from '../../../../../infra/db/mongodb/accountRepository/AccountMongoRepository'
import { LoadAccountByToken } from '../../../../../domain/usecases/account/LoadAccountByToken'
import { DbLoadAccountByToken } from '../../../../../data/usecases/account/LoadAccountByToken/DbLoadAccountByToken'
import { JwtAdapter } from '../../../../../infra/cryptography/jwtAdapter/JwtAdapter'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()

  const dbLoadAccountByToken = new DbLoadAccountByToken(
    jwtAdapter,
    accountMongoRepository
  )

  return dbLoadAccountByToken
}
