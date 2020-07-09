import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

import env from '../config/env'
import app from '../config/app'

import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (role?: string): Promise<string> => {
  const result = await accountCollection.insertOne({
    name: 'valid_name',
    email: 'valid_mail@mail.com',
    password: 'any_password',
    role
  })

  const accountId = result.ops[0]._id

  const accessToken = sign({ id: accountId }, env.jwtSecret)

  await accountCollection.updateOne({
    _id: accountId
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

describe('SurveyResultRoutes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'An answer.'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with valid accessToken', async () => {
      const accessToken = await makeAccessToken()

      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          answer: 'An answer.'
        }],
        date: new Date()
      })

      const surveyId: string = res.ops[0]._id

      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'An answer.'
        })
        .expect(200)
    })
  })
})
