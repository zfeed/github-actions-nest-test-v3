import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import Bet from '../../domain/bet/Bet';
import CreateResult from './results/CreateResult';

@Injectable()
class BetService {
    constructor(private em: EntityManager) {}

    async create(
        gameId: string,
        playerIds: string[],
        amount: number
    ): Promise<CreateResult> {
        const betRepository = this.em.getRepository(Bet);

        const bet = Bet.create(randomUUID(), gameId, amount, playerIds);

        await betRepository.persistAndFlush(bet);

        return CreateResult.create(bet);
    }
}

export default BetService;
