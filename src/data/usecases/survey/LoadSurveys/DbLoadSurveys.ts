import { LoadSurveys, LoadSurveysRepository, SurveyModel } from '@/data/usecases/survey/LoadSurveys/DbLoadSurveysProtocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {}

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()

    return surveys
  }
}
