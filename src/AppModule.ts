import { Module } from '@nestjs/common';
import GameModule from './game/web/GameModule';
import BetModule from './bet/Module';

@Module({
    imports: [GameModule, BetModule]
})
export default class AppModule {}
