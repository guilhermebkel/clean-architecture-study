import { AddSurvey, AddSurveyParams } from '@/presentation/controllers/survey/addSurvey/AddSurveyControllerProtocols'
import { LoadSurveys, SurveyModel } from '@/presentation/controllers/survey/loadSurveys/LoadSurveysControllerProtocols'
import { mockSurveyModels, mockSurveyModel } from '@/domain/test'
import { LoadSurveyById } from '@/presentation/controllers/surveyResult/saveSurveyResult/SaveSurveyResultControllerProtocols'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      const surveys = mockSurveyModels()

      return await Promise.resolve(surveys)
    }
  }

  const loadSurveysStub = new LoadSurveysStub()

  return loadSurveysStub
}

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }

  const addSurveyStub = new AddSurveyStub()

  return addSurveyStub
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }

  const loadSurveyByIdStub = new LoadSurveyByIdStub()

  return loadSurveyByIdStub
}
