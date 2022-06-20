import { Controller, Get, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { ClientAuthGuard } from 'src/auth/client-auth.guard'
import { ResponseBody } from 'src/interfaces/ResponseBody'
import { ScoreService } from './score.service'

@Controller('score')
export class ScoreController {
  private readonly scoreService: ScoreService

  constructor (scoreService: ScoreService) {
    this.scoreService = scoreService
  }

  @Get('@max')
  async getMaxAvailableScore (): Promise<ResponseBody<{ maxScore: number }>> {
    const maxScore = await this.scoreService.getTotalAvailableScores()
    return {
      success: true,
      data: {
        maxScore
      }
    }
  }

  @Get('@me')
  @UseGuards(ClientAuthGuard)
  async getMyScore (
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseBody<{ score: number }>> {
    const score = await this.scoreService.calculateScore(res.locals.userId)

    return {
      success: true,
      data: {
        score
      }
    }
  }
}
