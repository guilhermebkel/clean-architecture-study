import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './SaveSurveyResultControllerProtocols'
import { forbidden } from '@/presentation/helpers/http/HttpHelper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)

    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }

    return null
  }
}
