import { SurveyResultMongoRepository } from '@/infra/db/mongodb/surveyResultRepository/SurveyResultMongoRepository'
import { DbLoadSurveyResult } from '@/data/usecases/surveyResult/LoadSurveyResult/DbLoadSurveyResult'
import { SurveyMongoRepository } from '@/infra/db/mongodb/surveyRepository/SurveyMongoRepository'
import { LoadSurveyResult } from '@/domain/usecases/surveyResult/LoadSurveyResult'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()

  const dbLoadSurveyResult = new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)

  return dbLoadSurveyResult
}
