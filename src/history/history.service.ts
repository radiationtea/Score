import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { History } from './history.entity'

@Injectable()
export class HistoryService {
  private readonly histories: Repository<History>
  constructor (@InjectRepository(History) histories: Repository<History>) {
    this.histories = histories
  }

  async listUsersHistory (userId: string) {
    return await this.histories.find({ userId })
  }
}
