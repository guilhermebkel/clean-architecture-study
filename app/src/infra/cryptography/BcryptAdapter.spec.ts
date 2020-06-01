import bcrypt from 'bcrypt'

import { BcryptAdapter } from './BcryptAdapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  }
}))

const SALT = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(SALT)
}

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('valid_value')

    expect(hashSpy).toHaveBeenCalledWith('valid_value', SALT)
  })

  test('Should return a hash with success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('valid_value')

    expect(hash).toBe('hash')
  })
})
