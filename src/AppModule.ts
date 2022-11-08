import { Module } from '@nestjs/common';
import MatchModule from './contexts/game/Module';
import BettingModule from './contexts/betting/Module';

@Module({
    imports: [MatchModule, BettingModule]
})
export default class AppModule {}
