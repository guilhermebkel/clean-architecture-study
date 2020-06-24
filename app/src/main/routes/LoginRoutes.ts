import { Router } from 'express'

import { makeSignUpController } from '../factories/controllers/signup/SignUpControllerFactory'
import { makeLoginController } from '../factories/controllers/login/LoginControllerFactory'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
