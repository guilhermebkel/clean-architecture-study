import { Controller, HttpRequest, HttpResponse, LoadSurveyById, LoadSurveyResult } from '@/presentation/controllers/surveyResult/loadSurveyResult/LoadSurveyResultControllerProtocols'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/HttpHelper'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params

    try {
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.loadSurveyResult.load(surveyId)

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
