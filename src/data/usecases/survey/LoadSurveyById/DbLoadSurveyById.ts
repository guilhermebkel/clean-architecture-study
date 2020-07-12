import { LoadSurveyByIdRepository, SurveyModel, LoadSurveyById } from '@/data/usecases/survey/LoadSurveyById/DbLoadSurveyByIdProtocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)

    return survey
  }
}
