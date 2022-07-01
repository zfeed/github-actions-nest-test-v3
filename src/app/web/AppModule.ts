import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import GameController from './controllers/GameController';
import FieldController from './controllers/FieldController';
import GameService from '../../core/services/GameService';
import FieldService from '../../core/services/FieldService';

import FieldMarkedCellPositionChangedListner from './listeners/FieldMarkedCellPositionChangedListner';
import GameStartedEventListner from './listeners/GameStartedEventListner';
import MarkedCellHitEventListner from './listeners/MarkedCellHitEventListner';

@Module({
    imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
    controllers: [GameController, FieldController],
    providers: [
        GameService,
        FieldService,
        FieldMarkedCellPositionChangedListner,
        GameStartedEventListner,
        MarkedCellHitEventListner
    ]
})
export default class AppModule {}
