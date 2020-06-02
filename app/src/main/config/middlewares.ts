import { Express } from 'express'

import { bodyParser } from '../middlewares/BodyParser'
import { cors } from '../middlewares/Cors'
import { contentType } from '../middlewares/ContentType'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
