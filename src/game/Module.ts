import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import EventsController from './app/controllers/Events/Controller';
import GameController from './app/controllers/Game/Controller';
import FieldController from './app/controllers/Field/Controller';
import GameService from './core/services/GameService/GameService';
import FieldService from './core/services/FieldService/FieldService';

import GameStartedEventHandler from './core/handlers/GameStartedEventHandler';
import MarkedCellHitEventHandler from './core/handlers/MarkedCellHitEventHandler';

import FieldMarkedCellPositionChangedListener from './app/listeners/FieldMarkedCellPositionChangedListener';
import GameStartedEventListener from './app/listeners/GameStartedEventListener';
import MarkedCellHitEventListener from './app/listeners/MarkedCellHitEventListener';

import ServerSentEvents from './app/ServerSentEvents/ServerSentEvents';

@Module({
    imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
    controllers: [GameController, FieldController, EventsController],
    providers: [
        GameService,
        FieldService,
        GameStartedEventHandler,
        MarkedCellHitEventHandler,
        FieldMarkedCellPositionChangedListener,
        GameStartedEventListener,
        MarkedCellHitEventListener,
        ServerSentEvents
    ]
})
export default class GameModule {}
