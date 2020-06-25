import { Middleware } from '../../../presentation/protocols'
import { AuthMiddleware } from '../../../presentation/middlewares/AuthMiddleware'
import { makeDbLoadAccountByToken } from '../usecases/account/loadAccountByToken/DbLoadAccountByTokenFactory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const dbLoadAccountByToken = makeDbLoadAccountByToken()

  const authMiddleware = new AuthMiddleware(dbLoadAccountByToken, role)

  return authMiddleware
}
