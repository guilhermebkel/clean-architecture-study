import { AccountModel } from '@/domain/models/Account'

export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel>
}
