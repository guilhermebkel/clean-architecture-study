import { Collection } from 'mongodb'

import { MongoHelper } from '../helpers/MongoHelper'

import { SurveyResultMongoRepository } from './SurveyResultMongoRepository'
import { SurveyModel } from '@/domain/models/Survey'
import { AccountModel } from '@/domain/models/Account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  })

  return {
    ...res.ops[0],
    id: res.ops[0]._id
  }
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  return {
    ...res.ops[0],
    id: res.ops[0]._id
  }
}

describe('SurveyResultMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    surveyResultCollection = await MongoHelper.getCollection('surveyResult')
    await surveyResultCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should save a survey result if it is new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()

      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        question: survey.question,
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })
  })
})
