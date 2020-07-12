import { LogErrorRepository } from '@/data/protocols/db/log/LogErrorRepository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')

    const result = await errorCollection.insertOne({
      stack,
      date: new Date()
    })

    return MongoHelper.map(result.ops[0])
  }
}
