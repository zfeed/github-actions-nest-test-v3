import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Match } from '../domain/match';
import { MarkedCellHitEvent } from '../../../field/core/domain/events';

@Injectable()
export class MarkedCellHitEventHandler {
    constructor(private em: EntityManager) {}

    async handle(event: MarkedCellHitEvent): Promise<void> {
        const matchRepository = this.em.getRepository(Match);

        const match = await matchRepository.findOne(event.matchId);

        if (!match) {
            throw new Error('Match does not exist');
        }

        match.increasePlayerScore(event.playerId, new Date());

        matchRepository.flush();
    }
}
