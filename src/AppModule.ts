import { Module } from '@nestjs/common';
import GameModule from './game/web/GameModule';
import BetModule from './bet/app/BetModule';

@Module({
    imports: [GameModule, BetModule]
})
export default class AppModule {}
