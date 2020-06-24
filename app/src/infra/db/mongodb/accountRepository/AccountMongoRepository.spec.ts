import { Collection } from 'mongodb'

import { MongoHelper } from '../helpers/MongoHelper'

import { AccountMongoRepository } from './AccountMongoRepository'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')

    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()

      const account = await sut.add({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual('any_name')
      expect(account.email).toEqual('any_mail@mail.com')
      expect(account.password).toEqual('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()

      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })

      const account = await sut.loadByEmail('any_mail@mail.com')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual('any_name')
      expect(account.email).toEqual('any_mail@mail.com')
      expect(account.password).toEqual('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail('any_mail@mail.com')

      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()

      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      })

      const createdAccount = res.ops[0]

      expect(createdAccount.accessToken).toBeFalsy()

      await sut.updateAccessToken(createdAccount._id, 'any_token')

      const account = await accountCollection.findOne({ _id: createdAccount._id })

      expect(account).toBeTruthy()
      expect(account.accessToken).toEqual('any_token')
    })
  })
})
