import { randomUUID } from 'node:crypto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Field } from '../domain/field';
import { MatchStartedEvent } from '../../../match/core/domain/events';
import { FIELD_SIZE } from '../constants';
import { BaseEventHandler } from '../../../../../../packages/domain';

@Injectable()
export class MatchStartedEventHandler extends BaseEventHandler {
    constructor(private em: EntityManager) {
        super();
    }

    async handle(event: MatchStartedEvent) {
        await this.tryToHandle(this.handleEvent.bind(this), event);
    }

    private async handleEvent(event: MatchStartedEvent): Promise<void> {
        const em = this.em.fork();

        const field = Field.create(
            randomUUID(),
            event.playersId,
            event.matchId,
            FIELD_SIZE,
            new Date()
        );

        const fieldRepository = em.getRepository(Field);

        await fieldRepository.persistAndFlush(field);
    }
}
