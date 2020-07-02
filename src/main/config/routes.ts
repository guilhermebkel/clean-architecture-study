import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  readdirSync(`${__dirname}/../routes`)
    .filter(file => !file.includes('.test.') && !file.endsWith('.map'))
    .map(async file => (await import(`../routes/${file}`)).default(router))
}
