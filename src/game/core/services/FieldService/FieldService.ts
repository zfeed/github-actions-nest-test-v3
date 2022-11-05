import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { EventEmitter2 } from '@nestjs/event-emitter';

import Field from '../../domain/field/Field';
import GameStartedEvent from '../../domain/game/GameStartedEvent';
import Session from '../../domain/common/Session';
import * as HitResult from './results/HitResult';
import { FIELD_SIZE } from '../../constants';

@Injectable()
class FieldService {
    constructor(
        private em: EntityManager,
        private domainEventDispatcher: EventEmitter2
    ) {}

    async hit(fieldId: string, index: number, playerId: string) {
        const fieldRepository = this.em.getRepository(Field);

        const field = await fieldRepository.findOne(fieldId);

        if (!field) {
            return HitResult.FieldNotFoundResult.create();
        }

        if (field.playerExists(playerId) === false) {
            return HitResult.PlayerDoesNotExistResult.create();
        }

        field.hit(index, playerId, new Date());

        await fieldRepository.flush();

        field.events.forEach((event) =>
            this.domainEventDispatcher.emit(event.type, event)
        );

        return HitResult.HitResult.create(field);
    }

    async changeMarkedCellPosition(fieldId: string) {
        const fieldRepository = this.em.getRepository(Field);

        const field = await fieldRepository.findOne(fieldId);

        if (!field) {
            throw new Error('Field does not exist');
        }

        field.changeMarkedCellPosition(new Date());

        await fieldRepository.flush();

        field.events.forEach((event) =>
            this.domainEventDispatcher.emit(event.type, event)
        );
    }

    async handleGameStartedEvent(event: GameStartedEvent) {
        const session = Session.create(event.minutesToPlay, event.startedAt);

        const field = Field.create(
            randomUUID(),
            event.playersId,
            event.gameId,
            FIELD_SIZE,
            session
        );

        const fieldRepository = this.em.getRepository(Field);

        await fieldRepository.persistAndFlush(field);
    }
}

export default FieldService;
