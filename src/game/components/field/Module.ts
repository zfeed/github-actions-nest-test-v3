import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import FieldController from './infrastructure/controllers/FieldController';
import FieldService from './core/services/FieldService';

import MatchStartedEventHandler from './core/handlers/MatchStartedEventHandler';

import MatchStartedEventListener from './infrastructure/listeners/MatchStartedEventListener';
import FieldMarkedCellPositionChangedListener from './infrastructure/listeners/FieldMarkedCellPositionChangedListener';
import ServerSentEventsModule from '../../../packages/ServerSentEvents/Module';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        EventEmitterModule.forRoot(),
        ServerSentEventsModule
    ],
    controllers: [FieldController],
    providers: [
        FieldService,
        MatchStartedEventHandler,
        MatchStartedEventListener,
        FieldMarkedCellPositionChangedListener
    ]
})
export default class FieldModule {}
