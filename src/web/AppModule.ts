import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import GameController from './controllers/GameController';
import GameService from '../core/services/GameService';
import DomainEventDispatcher from '../DomainEventDispatcher';

@Module({
    imports: [MikroOrmModule.forRoot()],
    controllers: [GameController],
    providers: [GameService, DomainEventDispatcher]
})
export class AppModule {}
