import bcrypt from 'bcrypt'

import { BcryptAdapter } from './BcryptAdapter'

describe('BcryptAdapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12

    const sut = new BcryptAdapter(salt)

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('valid_value')

    expect(hashSpy).toHaveBeenCalledWith('valid_value', salt)
  })
})
