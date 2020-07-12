import { AddSurveyRepository } from '@/data/protocols/db/survey/AddSurveyRepository'
import { AddSurveyParams } from '@/data/usecases/survey/AddSurvey/DbAddSurveyProtocols'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/LoadSurveyByIdRepository'
import { SurveyModel, LoadSurveysRepository } from '@/data/usecases/survey/LoadSurveys/DbLoadSurveysProtocols'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (data: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }

  const addSurveyRepositoryStub = new AddSurveyRepositoryStub()

  return addSurveyRepositoryStub
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }

  const loadSurveyByIdRepository = new LoadSurveyByIdRepositoryStub()

  return loadSurveyByIdRepository
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }

  const loadSurveysRepository = new LoadSurveysRepositoryStub()

  return loadSurveysRepository
}
