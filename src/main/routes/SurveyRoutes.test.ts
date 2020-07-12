import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'

import env from '@/main/config/env'
import app from '@/main/config/app'

import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelper'

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

describe('SurveyRoutes', () => {
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

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'An answer.'
          }]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken('admin')

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'An answer.'
          }]
        })
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 200 on load surveys with valid accessToken', async () => {
      const accessToken = await makeAccessToken()

      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [{
            image: 'any_image',
            answer: 'any_answer'
          }],
          date: new Date()
        }
      ])

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
