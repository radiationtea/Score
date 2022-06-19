import {HistoryModule} from "src/history/history.module";

@Module({
  controller: [ScoreController],
  imports: [HistoryModule]
})
export class ScoreModule {}
