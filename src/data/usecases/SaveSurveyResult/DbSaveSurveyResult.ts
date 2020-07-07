import { SaveSurveyResultRepository, SaveSurveyResult, SaveSurveyResultModel, SurveyResultModel } from './DbSaveSurveyResultProtocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)

    return null
  }
}
