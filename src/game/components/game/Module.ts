import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import GameController from './infrastructure/controllers/GameController';
import GameService from './core/services/GameService';

import MarkedCellHitEventHandler from './core/handlers/MarkedCellHitEventHandler';
import MarkedCellHitEventListener from './infrastructure/listeners/MarkedCellHitEventListener';

@Module({
    imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
    controllers: [GameController],
    providers: [
        GameService,
        MarkedCellHitEventHandler,
        MarkedCellHitEventListener
    ]
})
export default class GameModule {}
