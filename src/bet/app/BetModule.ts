import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import GameFinishedEventListener from './listeners/GameFinishedEventListener';
import GameStartedEventListener from './listeners/GameStartedEventListener';

import BetService from '../core/services/BetService/BetService';

@Module({
    imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
    controllers: [],
    providers: [BetService, GameFinishedEventListener, GameStartedEventListener]
})
export default class BetModule {}
