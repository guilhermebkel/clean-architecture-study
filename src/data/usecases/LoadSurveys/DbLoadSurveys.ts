import { LoadSurveys } from '../../../domain/usecases/LoadSurveys'
import { LoadSurveysRepository } from '../../protocols/db/survey/LoadSurveysRepository'
import { SurveyModel } from '../../../domain/models/Survey'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {}

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()

    return surveys
  }
}
