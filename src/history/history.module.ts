import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionsModule } from 'src/permissions/permissions.module'
import { HistoryController } from './history.controller'
import { History } from './history.entity'
import { HistoryService } from './history.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
    PermissionsModule
  ],
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService]
})
export class HistoryModule {}
