import express from 'express'

import setupSwagger from '@/main/config/configSwagger'
import setupMiddlewares from '@/main/config/middlewares'
import setupRoutes from '@/main/config/routes'

const app = express()

setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
