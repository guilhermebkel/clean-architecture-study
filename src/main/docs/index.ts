import {
  loginPath,
  surveyPath
} from '@/main/docs/paths'
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  apiKeyAuthSchema
} from '@/main/docs/schemas'
import {
  badRequestErrorComponent,
  serverErrorComponent,
  unauthorizedErrorComponent,
  notFoundErrorComponent
} from '@/main/docs/components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'A super clean API made with NodeJS',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Survey'
  }],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    surveys: surveysSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequestError: badRequestErrorComponent,
    serverError: serverErrorComponent,
    unauthorizedError: unauthorizedErrorComponent,
    notFoundError: notFoundErrorComponent
  }
}
