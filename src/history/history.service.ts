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
