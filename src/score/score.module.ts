import { Module } from '@nestjs/common'
import { CategoriesModule } from 'src/categories/categories.module'
import { HistoryModule } from 'src/history/history.module'
import { ScoreController } from './score.controller'
import { ScoreService } from './score.service'

@Module({
  imports: [HistoryModule, CategoriesModule],
  providers: [ScoreService],
  controllers: [ScoreController]
})
export class ScoreModule {}
