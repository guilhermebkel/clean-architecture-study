import { Hasher } from '@/data/protocols/cryptography/Hasher'
import { Decrypter } from '@/data/protocols/cryptography/Decrypter'
import { Encrypter } from '@/data/protocols/cryptography/Encrypter'
import { HashComparer } from '@/data/protocols/cryptography/HashComparer'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }

  return new HasherStub()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_value')
    }
  }

  const decrypterStub = new DecrypterStub()

  return decrypterStub
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }

  const encrypterStub = new EncrypterStub()

  return encrypterStub
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }

  const hashComparerStub = new HashComparerStub()

  return hashComparerStub
}
