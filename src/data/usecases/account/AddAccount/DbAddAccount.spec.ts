import { Hasher, AccountModel, AddAccountParams, AddAccountRepository, LoadAccountByEmailRepository } from '@/data/usecases/account/AddAccount/DbAddAccountProtocols'
import { DbAddAccount } from '@/data/usecases/account/AddAccount/DbAddAccount'
import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }

  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel()

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

    const accountData = mockAddAccountParams()

    await sut.add(accountData)

    expect(hashSpy).toHaveBeenCalledWith(accountData.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { hasherStub, sut } = makeSut()

    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)

    const accountData = mockAddAccountParams()

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = mockAddAccountParams()

    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      ...accountData,
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)

    const accountData = mockAddAccountParams()

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()

    const accountData = mockAddAccountParams()

    const account = await sut.add(accountData)

    expect(account).toEqual({
      ...accountData,
      id: 'any_id',
      password: 'any_password'
    })
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const {
      sut,
      loadAccountByEmailRepositoryStub
    } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    const accountData = mockAddAccountParams()

    await sut.add(accountData)

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(mockAccountModel()))

    const accountData = mockAddAccountParams()

    const account = await sut.add(accountData)

    expect(account).toEqual(null)
  })
})
