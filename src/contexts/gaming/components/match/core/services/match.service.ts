import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match, Player } from '../domain';
import { Event } from '../../../../../../packages/local-event-storage';
import { CreateResult } from './results/create.result';
import * as JoinResults from './results/join.result';
import { MAX_PLAYERS } from '../constants';

@Injectable()
export class MatchService {
    constructor(
        private em: EntityManager,
        private domainEventDispatcher: EventEmitter2
    ) {}

    async create(playerName: string): Promise<CreateResult> {
        const matchRepository = this.em.getRepository(Match);

        const player = Player.create(randomUUID(), playerName);
        const match = Match.create(randomUUID(), player, MAX_PLAYERS);

        await matchRepository.persistAndFlush(match);

        return CreateResult.create(match);
    }

    async join(playerName: string, matchId: string) {
        const eventRepository = this.em.getRepository(Event);
        const matchRepository = this.em.getRepository(Match);
        const match = await matchRepository.findOne(matchId);

        if (!match) {
            return JoinResults.MatchNotFoundResult.create();
        }

        if (match.isMatchStarted()) {
            return JoinResults.MatchAlreadyStartedResult.create();
        }

        if (match.allPlayersJoined()) {
            return JoinResults.MatchIsFullResult.create();
        }

        const player = Player.create(randomUUID(), playerName);

        match.join(player, new Date(), randomUUID());

        match.events.forEach((data) => {
            const event = Event.create(
                data.id,
                JSON.stringify(data),
                data.type,
                new Date()
            );

            eventRepository.persist(event);
        });

        await this.em.flush();

        match.events.forEach((event) =>
            this.domainEventDispatcher.emit(event.type, event)
        );

        return JoinResults.MatchJoinedResult.create(match, player);
    }
}
