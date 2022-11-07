import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { EventEmitter2 } from '@nestjs/event-emitter';

import Field from '../../domain/field/Field';
import * as HitResult from './results/HitResult';

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
}

export default FieldService;
