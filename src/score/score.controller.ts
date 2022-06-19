import {ClientAuthGuard} from "src/auth/client-auth.guard";
import {ScoreService} from "./score.service";

@Controller('score')
export class ScoreController {
  private readonly scoreService: ScoreService

  constructor (scoreService: ScoreService) {
    this.scoreService = scoreService
  }

  @Get('@me')
  @UseGuard(ClientAuthGuard)
  async getMyScore (@Res({ passthoght: true }) res: Response): Promise<ResposeBody<{ score: number }>> {
    const score = await this.scoreService.calculateScore(res.locals.userId)

    return {
      success: true,
      data: {
        score
      }
    }
  }
}
