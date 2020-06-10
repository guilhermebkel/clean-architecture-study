import bcrypt from 'bcrypt'

import { BcryptAdapter } from './BcryptAdapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  },

  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const SALT = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(SALT)
}

describe('BcryptAdapter', () => {
  test('Should call hash method with correct values', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('valid_value')

    expect(hashSpy).toHaveBeenCalledWith('valid_value', SALT)
  })

  test('Should return a valid hash on hash method success', async () => {
    const sut = makeSut()

    const hash = await sut.hash('valid_value')

    expect(hash).toBe('hash')
  })

  test('Should throw if hash method throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.hash('valid_value')

    await expect(promise).rejects.toThrow()
  })

  test('Should call compare method with correct values', async () => {
    const sut = makeSut()

    const compareSpy = jest.spyOn(bcrypt, 'compare')

    await sut.compare('any_value', 'any_hash')

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true on compare method success', async () => {
    const sut = makeSut()

    const isValid = await sut.compare('any_value', 'any_hash')

    expect(isValid).toBe(true)
  })

  test('Should return false on compare method failure', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))

    const isValid = await sut.compare('any_value', 'any_hash')

    expect(isValid).toBe(false)
  })

  test('Should throw if compare method throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.compare('any_value', 'any_hash')

    await expect(promise).rejects.toThrow()
  })
})
