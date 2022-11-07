import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import FieldController from './infrastructure/controllers/FieldController';
import FieldService from './core/services/FieldService';

import GameStartedEventHandler from './core/handlers/GameStartedEventHandler';

import GameStartedEventListener from './infrastructure/listeners/GameStartedEventListener';
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
        GameStartedEventHandler,
        GameStartedEventListener,
        FieldMarkedCellPositionChangedListener
    ]
})
export default class FieldModule {}
