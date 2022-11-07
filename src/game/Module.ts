import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import EventsController from './web/controllers/Events/Controller';
import GameController from './web/controllers/Game/Controller';
import FieldController from './web/controllers/Field/Controller';
import GameService from './core/services/GameService/GameService';
import FieldService from './core/services/FieldService/FieldService';

import GameStartedEventHandler from './core/handlers/GameStartedEventHandler';
import MarkedCellHitEventHandler from './core/handlers/MarkedCellHitEventHandler';

import FieldMarkedCellPositionChangedListener from './web/listeners/FieldMarkedCellPositionChangedListener';
import GameStartedEventListener from './web/listeners/GameStartedEventListener';
import MarkedCellHitEventListener from './web/listeners/MarkedCellHitEventListener';

import ServerSentEvents from './web/ServerSentEvents/ServerSentEvents';

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
