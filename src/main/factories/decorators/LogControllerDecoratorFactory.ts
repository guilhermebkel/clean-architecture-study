import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/LogControllerDecorator'
import { LogMongoRepository } from '@/infra/db/mongodb/logRepository/LogMongoRepository'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()

  const logControllerDecorator = new LogControllerDecorator(
    controller,
    logMongoRepository
  )

  return logControllerDecorator
}
