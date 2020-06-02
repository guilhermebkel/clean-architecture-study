import { Router } from 'express'

import { makeSignUpController } from '../factories/SignUp'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
