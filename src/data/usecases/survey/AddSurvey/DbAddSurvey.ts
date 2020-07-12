import { AddSurvey, AddSurveyRepository, AddSurveyParams } from './DbAddSurveyProtocols'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) {}

  async add (data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
