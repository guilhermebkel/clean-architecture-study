import { AccountModel } from '../../models/Account'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (account: AddAccountParams) => Promise<AccountModel>
}
