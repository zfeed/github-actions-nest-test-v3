import { randomUUID } from 'node:crypto';
import { EntityManager } from '@mikro-orm/sqlite';
import Bet from '../domain/bet/Bet';
import { GameStartedEvent } from '../../../integration';

export default class GameStartedEventHandler {
    constructor(private em: EntityManager) {}

    async handle(event: GameStartedEvent) {
        const betRepository = this.em.getRepository(Bet);

        const bet = Bet.create(randomUUID(), event.gameId, 0, event.playersId);

        await betRepository.persistAndFlush(bet);
    }
}
