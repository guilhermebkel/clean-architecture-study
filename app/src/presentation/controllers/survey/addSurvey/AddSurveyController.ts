import { Controller, HttpRequest, HttpResponse, Validation } from './AddSurveyControllerProtocols'
import { badRequest } from '../../../helpers/http/HttpHelper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }

    return await Promise.resolve(null)
  }
}
