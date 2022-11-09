import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import { FieldController } from './infrastructure/controllers';
import { FieldService } from './core/services';

import { MatchStartedEventHandler } from './core/handlers';

import {
    MatchStartedEventListener,
    FieldMarkedCellPositionChangedListener
} from './infrastructure/listeners';

import { ServerSentEventsModule } from '../../../../packages/server-sent-events';

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
export class FieldModule {}
