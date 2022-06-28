import { randomUUID } from 'node:crypto';

import Field from '../domain/Field';
import FieldRepository from '../repositories/FieldRepository';
import DomainEventDispatcher from '../DomainEventDispatcher';
import GameStartedEvent from '../domain/events/GameStartedEvent';
import Session from '../domain/Session';

class FieldService {
    static hit(
        fieldId: string,
        index: number,
        playerId: string,
        domainEventDispatcher: DomainEventDispatcher,
        fieldRepository: FieldRepository
    ) {
        const field = fieldRepository.getById(fieldId);

        if (!field) {
            throw new Error('Field does not exist');
        }

        field.hit(index, playerId, new Date());

        field.events.forEach((event) => domainEventDispatcher.dispatch(event));

        fieldRepository.save(field);
    }

    static changeMarkedCellPosition(
        fieldId: string,
        domainEventDispatcher: DomainEventDispatcher,
        fieldRepository: FieldRepository
    ) {
        const field = fieldRepository.getById(fieldId);

        if (!field) {
            throw new Error('Field does not exist');
        }

        field.changeMarkedCellPosition(new Date());

        field.events.forEach((event) => domainEventDispatcher.dispatch(event));

        fieldRepository.save(field);
    }

    static hundleGameStartedEvent(
        event: GameStartedEvent,
        fieldRepository: FieldRepository
    ) {
        const session = Session.create(event.minutesToPlay, event.startedAt);

        const field = Field.create(
            randomUUID(),
            event.playersId,
            event.gameId,
            16,
            session
        );

        fieldRepository.save(field);
    }
}

export default FieldService;
