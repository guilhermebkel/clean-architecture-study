import { MongoHelper } from '../helpers/MongoHelper'
import { AddSurveyModel } from '../../../../domain/usecases/AddSurvey'
import { AddSurveyRepository } from '../../../../data/protocols/db/survey/AddSurveyRepository'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (data: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    await surveyCollection.insertOne(data)
  }
}
