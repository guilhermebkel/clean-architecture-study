import {
  badRequestErrorComponent,
  serverErrorComponent,
  unauthorizedErrorComponent,
  notFoundErrorComponent
} from '@/main/docs/components/'
import {
  apiKeyAuthSchema
} from '@/main/docs/schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequestError: badRequestErrorComponent,
  serverError: serverErrorComponent,
  unauthorizedError: unauthorizedErrorComponent,
  notFoundError: notFoundErrorComponent
}
