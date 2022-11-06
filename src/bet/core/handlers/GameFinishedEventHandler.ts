import { EntityManager } from '@mikro-orm/sqlite';
import Bet from '../domain/bet/Bet';
import WinnerService from '../domain/WinnerService';
import { GameFinishedEvent } from '../../../integration';

export default class GameFinishedEventHandler {
    constructor(private em: EntityManager) {}

    async handle(event: GameFinishedEvent): Promise<void> {
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
