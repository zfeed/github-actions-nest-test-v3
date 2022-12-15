import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Bet } from '../domain/bet';
import { WinnerService } from '../domain/services';
import { MatchFinishedEvent } from '../../../gaming';

@Injectable()
export class MatchFinishedEventHandler {
    constructor(private em: EntityManager) {}

    async handle(event: MatchFinishedEvent): Promise<void> {
        const betRepository = this.em.getRepository(Bet);

        const bet = await betRepository.findOne({ matchId: event.matchId });

        if (!bet) {
            throw new Error("Bet doesn't exist");
        }

        const winner = WinnerService.findWinnerAmongPlayers(event.players);

        bet.finishBet(winner.id);

        await betRepository.persistAndFlush(bet);
    }
}
