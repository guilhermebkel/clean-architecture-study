import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './SaveSurveyResultControllerProtocols'
import { forbidden, serverError } from '@/presentation/helpers/http/HttpHelper'
import { InvalidParamError } from '@/presentation/errors'
import { SaveSurveyResult } from '@/domain/usecases/surveyResult/SaveSurveyResult'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest

      const survey = await this.loadSurveyById.loadById(surveyId)

      if (survey) {
        const answers = survey.answers?.map(answerItem => answerItem?.answer)

        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      await this.saveSurveyResult.save({
        accountId,
        surveyId,
        date: new Date(),
        answer
      })

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
