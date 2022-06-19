import {History} from "./history.entity";

@Module({
  imports: [TypeOrmModule.forFeatures([History])]m
  providers: [HistoryService],
  exports: [HistoryService]
})
export class HistoryModule {}
