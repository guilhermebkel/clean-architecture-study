import { SaveSurveyResultRepository, SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '@/data/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResultProtocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)

    return surveyResult
  }
}
