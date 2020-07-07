import { AccountModel } from '../../models/Account'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
