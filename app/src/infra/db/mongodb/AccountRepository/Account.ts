import { AddAccountRepository } from '../../../../data/protocols/db/AddAccountRepository'
import { AccountModel } from '../../../../domain/models/Account'
import { AddAccountModel } from '../../../../domain/usecases/AddAccount'
import { MongoHelper } from '../helpers/MongoHelper'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/LoadAccountByEmailRepository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)

    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const account = await accountCollection.findOne({ email })

    return account && MongoHelper.map(account)
  }
}
