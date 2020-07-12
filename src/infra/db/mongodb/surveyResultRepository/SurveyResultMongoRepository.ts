import { MongoHelper } from '../helpers/MongoHelper'
import { SaveSurveyResultRepository } from '@/data/protocols/db/account/SaveSurveyResultRepository'
import { SaveSurveyResultParams } from '@/domain/usecases/surveyResult/SaveSurveyResult'
import { SurveyResultModel } from '@/domain/models/SurveyResult'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')

    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })

    return res?.value && MongoHelper.map(res.value)
  }
}
