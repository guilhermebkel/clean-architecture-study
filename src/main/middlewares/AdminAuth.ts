import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { makeAuthMiddleware } from '../factories/middlewares/AuthMiddlewareFactory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
