import { Module } from '@nestjs/common';
import MatchModule from './game/Module';
import BettingModule from './betting/Module';

@Module({
    imports: [MatchModule, BettingModule]
})
export default class AppModule {}
