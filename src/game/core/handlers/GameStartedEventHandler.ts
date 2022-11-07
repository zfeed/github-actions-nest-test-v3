import { randomUUID } from 'node:crypto';
import { EntityManager } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import Field from '../domain/field/Field';
import GameStartedEvent from '../domain/game/GameStartedEvent';
import Session from '../domain/common/Session';
import { FIELD_SIZE } from '../constants';

@Injectable()
export default class GameStartedEventHandler {
    constructor(private em: EntityManager) {}

    async handle(event: GameStartedEvent): Promise<void> {
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
