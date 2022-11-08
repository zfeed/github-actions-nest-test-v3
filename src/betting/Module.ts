import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import MatchFinishedEventListener from './infrastructure/listeners/MatchFinishedEventListener';
import MatchStartedEventListener from './infrastructure/listeners/MatchStartedEventListener';

import MatchFinishedEventHandler from './core/handlers/MatchFinishedEventHandler';
import MatchStartedEventHandler from './core/handlers/MatchStartedEventHandler';

@Module({
    imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
    controllers: [],
    providers: [
        MatchStartedEventHandler,
        MatchFinishedEventHandler,
        MatchFinishedEventListener,
        MatchStartedEventListener
    ]
})
export default class BetModule {}
