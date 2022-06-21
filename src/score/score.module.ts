import { Module } from '@nestjs/common'
import { CategoriesModule } from 'src/categories/categories.module'
import { HistoryModule } from 'src/history/history.module'
import {PermissionsModule} from 'src/permissions/permissions.module'
import {UsersModule} from 'src/users/users.module'
import { ScoreController } from './score.controller'
import { ScoreService } from './score.service'

@Module({
  imports: [
    UsersModule,
    HistoryModule,
    CategoriesModule,
    PermissionsModule
  ],
  providers: [ScoreService],
  controllers: [ScoreController]
})
export class ScoreModule {}
