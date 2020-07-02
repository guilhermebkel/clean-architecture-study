import { AccountModel } from '../models/Account'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
