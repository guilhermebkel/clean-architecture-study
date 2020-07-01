import { LoadSurveys } from '../../../../../domain/usecases/LoadSurveys'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/surveyRepository/SurveyMongoRepository'
import { DbLoadSurveys } from '../../../../../data/usecases/LoadSurveys/DbLoadSurveys'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()

  const dbLoadSurveys = new DbLoadSurveys(surveyMongoRepository)

  return dbLoadSurveys
}
