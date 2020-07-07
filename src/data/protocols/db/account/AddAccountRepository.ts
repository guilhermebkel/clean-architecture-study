import { AddAccountModel } from '../../../../domain/usecases/account/AddAccount'
import { AccountModel } from '../../../../domain/models/Account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
