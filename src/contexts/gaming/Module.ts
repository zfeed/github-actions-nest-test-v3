import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';

import FieldModule from './components/field/Module';
import MatchModule from './components/match/Module';

import ServerSentEvents from '../../packages/ServerSentEvents/ServerSentEvents';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        EventEmitterModule.forRoot(),
        MatchModule,
        FieldModule
    ],
    providers: [ServerSentEvents]
})
export default class GamingModule {}
