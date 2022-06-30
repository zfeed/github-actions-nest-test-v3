import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';

import Field from '../domain/field/Field';
import DomainEventDispatcher from '../../DomainEventDispatcher';
import GameStartedEvent from '../domain/game/GameStartedEvent';
import Session from '../domain/common/Session';

@Injectable()
class FieldService {
    constructor(
        private em: EntityManager,
        private domainEventDispatcher: DomainEventDispatcher
    ) {}

    async hit(fieldId: string, index: number, playerId: string) {
        const fieldRepository = this.em.getRepository(Field);

        const field = await fieldRepository.findOne(fieldId);

        if (!field) {
            throw new Error('Field does not exist');
        }

        field.hit(index, playerId, new Date());

        await fieldRepository.flush();

        field.events.forEach((event) =>
            this.domainEventDispatcher.dispatch(event)
        );
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
            this.domainEventDispatcher.dispatch(event)
        );
    }

    async hundleGameStartedEvent(event: GameStartedEvent) {
        const session = Session.create(event.minutesToPlay, event.startedAt);

        const field = Field.create(
            randomUUID(),
            event.playersId,
            event.gameId,
            16,
            session
        );

        const fieldRepository = this.em.getRepository(Field);

        await fieldRepository.persistAndFlush(field);
    }
}

export default FieldService;
