import { DbAddAccount } from '../../../../../data/usecases/AddAccount/DbAddAccount'
import { BcryptAdapter } from '../../../../../infra/cryptography/bcryptAdapter/BcryptAdapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/accountRepository/AccountMongoRepository'
import { AddAccount } from '../../../../../domain/usecases/AddAccount'

export const makeDbAddAccount = (): AddAccount => {
  const SALT = 12

  const bcryptAdapter = new BcryptAdapter(SALT)
  const accountMongoRepository = new AccountMongoRepository()

  const dbAddAccount = new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository
  )

  return dbAddAccount
}
