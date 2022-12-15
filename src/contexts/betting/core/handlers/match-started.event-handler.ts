import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Bet } from '../domain/bet';
import { MatchStartedEvent } from '../../../gaming';

@Injectable()
export class MatchStartedEventHandler {
    constructor(private em: EntityManager) {}

    async handle(event: MatchStartedEvent) {
        const betRepository = this.em.getRepository(Bet);

        const bet = Bet.create(randomUUID(), event.matchId, 0, event.playersId);

        await betRepository.persistAndFlush(bet);
    }
}
