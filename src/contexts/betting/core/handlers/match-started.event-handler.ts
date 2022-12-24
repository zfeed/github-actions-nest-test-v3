import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Bet } from '../domain/bet';
import { MatchStartedEvent } from '../../../gaming';
import { BaseEventHandler } from '../../../../packages/domain';

@Injectable()
export class MatchStartedEventHandler extends BaseEventHandler {
    constructor(private em: EntityManager) {
        super();
    }

    async handle(event: MatchStartedEvent) {
        await this.tryToHandle(this.handleEvent.bind(this), event);
    }

    async handleEvent(event: MatchStartedEvent) {
        const em = this.em.fork();

        const betRepository = em.getRepository(Bet);

        const bet = Bet.create(randomUUID(), event.matchId, 0, event.playersId);

        await betRepository.persistAndFlush(bet);
    }
}
