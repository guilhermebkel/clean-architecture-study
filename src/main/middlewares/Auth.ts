import { adaptMiddleware } from '@/main/adapters/ExpressMiddlewareAdapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFactory'

export const auth = adaptMiddleware(makeAuthMiddleware())
