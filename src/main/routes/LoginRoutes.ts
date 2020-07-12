import { Router } from 'express'

import { makeSignUpController } from '@/main/factories/controllers/login/signup/SignUpControllerFactory'
import { makeLoginController } from '@/main/factories/controllers/login/login/LoginControllerFactory'
import { adaptRoute } from '@/main/adapters/ExpressRouteAdapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
