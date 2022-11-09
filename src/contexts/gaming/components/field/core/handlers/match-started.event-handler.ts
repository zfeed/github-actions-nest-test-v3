import { randomUUID } from 'node:crypto';
import { EntityManager } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Field } from '../domain/Field';
import { MatchStartedEvent } from '../../../match/core/domain/events';
import { Session } from '../../../../shared/domain';
import { FIELD_SIZE } from '../../../../shared/constants';

@Injectable()
export class MatchStartedEventHandler {
    constructor(private em: EntityManager) {}

    async handle(event: MatchStartedEvent): Promise<void> {
        const session = Session.create(event.minutesToPlay, event.startedAt);

        const field = Field.create(
            randomUUID(),
            event.playersId,
            event.matchId,
            FIELD_SIZE,
            session
        );

        const fieldRepository = this.em.getRepository(Field);

        await fieldRepository.persistAndFlush(field);
    }
}
