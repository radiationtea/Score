import {HistoryService} from "src/history/history.service";

@Injectable()
export class ScoreService {
  private readonly historyService: HistoryService

  constructor (historyService: HistoryService) {
    this.historyService = historyService
  }

  public async calculateScore (userId: string) {
    const histories = await this.historyService.listUsersHistory(userId)
    histories.reduce((prev: number[], curr) => {
      let temp = prev[curr.subcategory.parent.categoryId]
      temp += curr.subcategory.score

      if (temp > curr.subcategory.parent.max_score)
        return prev

      prev[curr.subcategory.parent.categoryId]
        += curr.subcategory.score

      return prev
    }, [] as number[]).reduce((prev: number, curr: number) => prev + curr, 0)
  }
}
