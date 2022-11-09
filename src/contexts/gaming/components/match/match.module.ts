import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import { MatchController } from './infrastructure/controllers';
import { MatchService } from './core/services';

import { MarkedCellHitEventHandler } from './core/handlers';
import { MarkedCellHitEventListener } from './infrastructure/listeners';

@Module({
    imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
    controllers: [MatchController],
    providers: [
        MatchService,
        MarkedCellHitEventHandler,
        MarkedCellHitEventListener
    ]
})
export class MatchModule {}
