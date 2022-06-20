import { Module } from '@nestjs/common'
import { HistoryModule } from 'src/history/history.module'
import { ScoreController } from './score.controller'
import { ScoreService } from './score.service'

@Module({
  imports: [HistoryModule],
  providers: [ScoreService],
  controllers: [ScoreController]
})
export class ScoreModule {}
