import { Hasher, AccountModel, AddAccountParams, AddAccountRepository } from './DbAddAccountProtocols'
import { DbAddAccount } from './DbAddAccount'
import { LoadAccountByEmailRepository } from '../Authentication/DbAuthenticationProtocols'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }

  return new HasherStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAccountData = (): AddAccountParams => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = makeFakeAccount()

      return await Promise.resolve(fakeAccount)
    }
  }

  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await Promise.resolve(null)
    }
  }

  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()

  return loadAccountByEmailRepositoryStub
}

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()

  const sut = new DbAddAccount(
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  )

  return {
    hasherStub,
    addAccountRepositoryStub,
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DBAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { hasherStub, sut } = makeSut()

    const hashSpy = jest.spyOn(hasherStub, 'hash')

    const accountData = makeFakeAccountData()

    await sut.add(accountData)

    expect(hashSpy).toHaveBeenCalledWith(accountData.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { hasherStub, sut } = makeSut()

    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const accountData = makeFakeAccountData()

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = makeFakeAccountData()

    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      ...accountData,
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const accountData = makeFakeAccountData()

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()

    const accountData = makeFakeAccountData()

    const account = await sut.add(accountData)

    expect(account).toEqual({
      ...accountData,
      id: 'valid_id',
      password: 'hashed_password'
    })
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const {
      sut,
      loadAccountByEmailRepositoryStub
    } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    const accountData = makeFakeAccountData()

    await sut.add(accountData)

    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(makeFakeAccount()))

    const accountData = makeFakeAccountData()

    const account = await sut.add(accountData)

    expect(account).toEqual(null)
  })
})
