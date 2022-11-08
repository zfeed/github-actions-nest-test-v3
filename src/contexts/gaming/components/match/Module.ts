import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import MatchController from './infrastructure/controllers/MatchController';
import MatchService from './core/services/MatchService';

import MarkedCellHitEventHandler from './core/handlers/MarkedCellHitEventHandler';
import MarkedCellHitEventListener from './infrastructure/listeners/MarkedCellHitEventListener';

@Module({
    imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
    controllers: [MatchController],
    providers: [
        MatchService,
        MarkedCellHitEventHandler,
        MarkedCellHitEventListener
    ]
})
export default class MatchModule {}
