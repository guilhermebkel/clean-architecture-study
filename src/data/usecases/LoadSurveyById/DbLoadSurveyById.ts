import { LoadSurveyByIdRepository } from '../../protocols/db/survey/LoadSurveyByIdRepository'
import { SurveyModel } from '@/domain/models/Survey'
import { LoadSurveyById } from '@/domain/usecases/LoadSurveyById'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)

    return survey
  }
}
