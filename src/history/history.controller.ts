import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ResponseBody } from 'src/interfaces/ResponseBody'
import { Require } from 'src/permissions/permissions.decorator'
import { PermissionsGuard } from 'src/permissions/permissions.guard'
import { QueryHistoryDto } from './dto/QueryHistory.dto'
import { History } from './history.entity'
import { HistoryService } from './history.service'

@Controller('history')
export class HistoryController {
  private readonly historyService: HistoryService

  constructor (historyService: HistoryService) {
    this.historyService = historyService
  }

  @Get()
  @Require('VIEW_REQUESTS')
  @UseGuards(PermissionsGuard)
  async queryRequests (
    @Query('per_pages') perPages: number,
    @Query() query: QueryHistoryDto
  ): Promise<ResponseBody<{ histories: History[] }>> {
    const histories = await this.historyService.queryHistory(
      query.page,
      perPages
    )

    return {
      success: true,
      data: {
        histories
      }
    }
  }
}
