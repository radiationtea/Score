import { Injectable } from '@nestjs/common'
import { CategoriesService } from 'src/categories/categories.service'
import { History } from 'src/history/history.entity'
import { HistoryService } from 'src/history/history.service'
import { Users } from 'src/users/users.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class ScoreService {
  private readonly historyService: HistoryService
  private readonly categoriesService: CategoriesService
  private readonly usersService: UsersService

  constructor (
    historyService: HistoryService,
    categoriesService: CategoriesService,
    usersService: UsersService
  ) {
    this.historyService = historyService
    this.categoriesService = categoriesService
    this.usersService = usersService
  }

  public async getTotalAvailableScores (): Promise<number> {
    const categories = await this.categoriesService.listCategories()
    return categories.reduce((prev, curr) => prev + curr.maxScore, 0)
  }

  public async getMyRank (userId: string): Promise<number> {
    const users = await this.usersService.listAllUser()
    const scored = users.map(async (u) =>
      ({ ...u, score: await this.calculateScore(u.userId) }))
    const sorted = (await Promise.all(scored)).sort((a, b) => b.score - a.score)
    const striped = sorted
      .map((u, i) => ({ ...u, rank: i }))
      .find((u) => u.userId === userId)

    return striped.rank
  }

  public async queryLeaderboard (
    page = 0,
    perPage = 10
  ): Promise<Array<Users & { score: number, rank: number }>> {
    const users = await this.usersService.listAllUser()
    const scored = users.map(async (u) =>
      ({ ...u, score: await this.calculateScore(u.userId) }))
    const sorted = (await Promise.all(scored)).sort((a, b) => b.score - a.score)
    const striped = sorted
      .slice(page * perPage, (page + 1) * perPage)
      .map((u, i) => ({ ...u, rank: page * perPage + i + 1 }))

    return striped
  }

  public async calculateScore (userId: string, categoryId?: number): Promise<number> {
    let histories = await this.historyService.listUsersHistory(userId)
    if (Number.isInteger(categoryId)) {
      histories = histories.filter((v) => v.subcategory?.parentId === categoryId)
    }

    return histories.reduce((prev: number[], curr: History) => {
      if (!curr.subcategory) return prev

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
