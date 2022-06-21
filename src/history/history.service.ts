import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { History } from './history.entity'

@Injectable()
export class HistoryService {
  private histories: Repository<History>
  constructor (@InjectRepository(History) histories: Repository<History>) {
    this.histories = histories
  }

  async listUsersHistory (userId: string) {
    return await this.histories.find({ userId })
  }

  async queryHistory (page = 0, perPage = 10, filter?: {
    userId?: string
  }): Promise<History[]> {
    return await this.histories.find({
      skip: page * perPage,
      take: perPage,
      where: filter || undefined
    })
  }
}
