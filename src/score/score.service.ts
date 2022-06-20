import { Injectable } from '@nestjs/common'
import { History } from 'src/history/history.entity'
import { HistoryService } from 'src/history/history.service'

@Injectable()
export class ScoreService {
  private readonly historyService: HistoryService

  constructor (historyService: HistoryService) {
    this.historyService = historyService
  }

  public async calculateScore (userId: string): Promise<number> {
    const histories = await this.historyService.listUsersHistory(userId)
    console.log(histories)

    return histories.reduce((prev: number[], curr: History) => {
      const { categoryId, maxScore } = curr.subcategory.parent

      let temp = prev[categoryId]
      temp += curr.subcategory.score

      if (temp > maxScore) return prev

      prev[categoryId] =
        (prev[categoryId] || 0) + curr.subcategory.score

      return prev
    }, [] as number[]).reduce((prev: number, curr: number) => prev + curr, 0)
  }
}
