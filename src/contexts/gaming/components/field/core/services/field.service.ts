import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Field } from '../domain/field';
import { Event } from '../../../../../../packages/local-event-storage';
import * as HitResult from './results/hit.result';

@Injectable()
export class FieldService {
    constructor(
        private em: EntityManager,
        private domainEventDispatcher: EventEmitter2
    ) {}

    async hit(fieldId: string, index: number, playerId: string) {
        const eventRepository = this.em.getRepository(Event);
        const fieldRepository = this.em.getRepository(Field);

        const field = await fieldRepository.findOne(fieldId);

        if (!field) {
            return HitResult.FieldNotFoundResult.create();
        }

        if (field.playerExists(playerId) === false) {
            return HitResult.PlayerDoesNotExistResult.create();
        }

        field.hit(index, playerId, randomUUID());

        field.events.forEach((data) => {
            const event = Event.create(
                data.id,
                JSON.stringify(data),
                data.type,
                new Date()
            );

            eventRepository.persist(event);
        });

        await this.em.flush();

        field.events.forEach((event) =>
            this.domainEventDispatcher.emit(event.type, event)
        );

        return HitResult.HitResult.create(field);
    }

    async changeMarkedCellPosition(fieldId: string) {
        const eventRepository = this.em.getRepository(Event);
        const fieldRepository = this.em.getRepository(Field);

        const field = await fieldRepository.findOne(fieldId);

        if (!field) {
            throw new Error('Field does not exist');
        }

        field.changeMarkedCellPosition(randomUUID());

        field.events.forEach((data) => {
            const event = Event.create(
                data.id,
                JSON.stringify(data),
                data.type,
                new Date()
            );

            eventRepository.persist(event);
        });

        await this.em.flush();

        field.events.forEach((event) =>
            this.domainEventDispatcher.emit(event.type, event)
        );
    }
}
