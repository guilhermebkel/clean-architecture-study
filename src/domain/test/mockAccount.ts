import { AccountModel } from '@/domain/models/Account'
import { AddAccountParams } from '@/domain/usecases/account/AddAccount'
import { AuthenticationParams } from '@/domain/usecases/account/Authentication'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => ({
  ...mockAddAccountParams(),
  id: 'any_id'
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
