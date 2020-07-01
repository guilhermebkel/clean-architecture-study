import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddlewareFactory'

export const auth = adaptMiddleware(makeAuthMiddleware())
