import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { ClientAuthGuard } from 'src/auth/client-auth.guard'
import { ResponseBody } from 'src/interfaces/ResponseBody'
import { Require } from 'src/permissions/permissions.decorator'
import { PermissionsGuard } from 'src/permissions/permissions.guard'
import { QueryScoresDto } from './dto/QueryScores.dto'
import { ScoreService } from './score.service'

@Controller('score')
export class ScoreController {
  private readonly scoreService: ScoreService

  constructor (scoreService: ScoreService) {
    this.scoreService = scoreService
  }

  @Get()
  @Require('VIEW_SCORES')
  @UseGuards(PermissionsGuard)
  async queryScores (@Query() query: QueryScoresDto) {
    return {
      success: true,
      data: {
        ranks: await this.scoreService.queryLeaderboard(query.page, query.perPages)
      }
    }
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
    @Query('category') category: number | undefined,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseBody<{ score: number, rank: number }>> {
    const score = await this.scoreService.calculateScore(res.locals.userId, category)
    const rank = await this.scoreService.getMyRank(res.locals.userId)

    return {
      success: true,
      data: {
        score,
        rank
      }
    }
  }
}
