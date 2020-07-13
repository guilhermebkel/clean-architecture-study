import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

import { noCache } from '@/main/middlewares/NoCache'

import swaggerConfig from '@/main/docs'

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
