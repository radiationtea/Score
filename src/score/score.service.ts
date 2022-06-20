import { Injectable } from '@nestjs/common'
import { CategoriesService } from 'src/categories/categories.service'
import { History } from 'src/history/history.entity'
import { HistoryService } from 'src/history/history.service'

@Injectable()
export class ScoreService {
  private readonly historyService: HistoryService
  private readonly categoriesService: CategoriesService

  constructor (historyService: HistoryService, categoriesService: CategoriesService) {
    this.historyService = historyService
    this.categoriesService = categoriesService
  }

  public async getTotalAvailableScores (): Promise<number> {
    const categories = await this.categoriesService.listCategories()
    return categories.reduce((prev, curr) => prev + curr.maxScore, 0)
  }

  public async calculateScore (userId: string): Promise<number> {
    const histories = await this.historyService.listUsersHistory(userId)

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
