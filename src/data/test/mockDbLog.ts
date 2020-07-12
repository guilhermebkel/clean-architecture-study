import { LogErrorRepository } from '@/data/protocols/db/log/LogErrorRepository'

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await Promise.resolve()
    }
  }

  const logErrorRepositoryStub = new LogErrorRepositoryStub()

  return logErrorRepositoryStub
}
