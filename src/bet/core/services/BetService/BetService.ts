import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import Bet from '../../domain/bet/Bet';
import WinnerService from '../../domain/WinnerService';
import CreateResult from './results/CreateResult';
import { GameStartedEvent, GameFinishedEvent } from '../../../../integration';

@Injectable()
class BetService {
    constructor(private em: EntityManager) {}

    async handleGameStartedEvent(
        event: GameStartedEvent
    ): Promise<CreateResult> {
        const betRepository = this.em.getRepository(Bet);

        const bet = Bet.create(randomUUID(), event.gameId, 0, event.playersId);

        await betRepository.persistAndFlush(bet);

        return CreateResult.create(bet);
    }

    async handleGameFinishedEvent(event: GameFinishedEvent) {
        const betRepository = this.em.getRepository(Bet);

        const bet = await betRepository.findOne({ gameId: event.gameId });

        if (!bet) {
            throw new Error("Bet doesn't exist");
        }

        const winner = WinnerService.findWinnerAmongPlayers(event.players);

        bet.finishBet(winner.id);

        await betRepository.persistAndFlush(bet);
    }
}

export default BetService;
