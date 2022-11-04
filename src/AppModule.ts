import { Module } from '@nestjs/common';
import GameModule from './game/web/GameModule';

@Module({
    imports: [GameModule]
})
export default class AppModule {}
