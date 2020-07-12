import { SurveyMongoRepository } from '@/infra/db/mongodb/surveyRepository/SurveyMongoRepository'
import { LoadSurveyById } from '@/domain/usecases/survey/LoadSurveyById'
import { DbLoadSurveyById } from '@/data/usecases/survey/LoadSurveyById/DbLoadSurveyById'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()

  const dbLoadSurveyById = new DbLoadSurveyById(surveyMongoRepository)

  return dbLoadSurveyById
}
