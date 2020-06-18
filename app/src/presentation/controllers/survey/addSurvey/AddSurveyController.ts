import { Controller, HttpRequest, HttpResponse, Validation, AddSurvey } from './AddSurveyControllerProtocols'
import { badRequest, serverError } from '../../../helpers/http/HttpHelper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body

      await this.addSurvey.add({
        question,
        answers
      })

      return await Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
