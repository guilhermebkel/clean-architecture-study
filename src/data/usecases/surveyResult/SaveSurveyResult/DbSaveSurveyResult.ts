import { SaveSurveyResultRepository, SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel, LoadSurveyResultRepository } from '@/data/usecases/surveyResult/SaveSurveyResult/DbSaveSurveyResultProtocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)

    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)

    return surveyResult
  }
}
