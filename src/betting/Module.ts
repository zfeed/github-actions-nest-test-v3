import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import GameFinishedEventListener from './infrastructure/listeners/GameFinishedEventListener';
import GameStartedEventListener from './infrastructure/listeners/GameStartedEventListener';

import GameFinishedEventHandler from './core/handlers/GameFinishedEventHandler';
import GameStartedEventHandler from './core/handlers/GameStartedEventHandler';

@Module({
    imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
    controllers: [],
    providers: [
        GameStartedEventHandler,
        GameFinishedEventHandler,
        GameFinishedEventListener,
        GameStartedEventListener
    ]
})
export default class BetModule {}
