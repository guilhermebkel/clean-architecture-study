import { AddAccountRepository } from '../../../../data/protocols/AddAccountRepository'
import { AccountModel } from '../../../../domain/models/Account'
import { AddAccountModel } from '../../../../domain/usecases/AddAccount'
import { MongoHelper } from '../helpers/MongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')

    const result = await accountCollection.insert(accountData)

    const [account] = result.ops

    const { _id, ...accountWithoutId } = account

    return {
      ...accountWithoutId,
      id: account._id
    }
  }
}
