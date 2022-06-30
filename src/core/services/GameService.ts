import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';

import Game from '../domain/game/Game';
import Player from '../domain/game/Player';
import DomainEventDispatcher from '../../DomainEventDispatcher';
import MarkedCellHitEvent from '../domain/field/MarkedCellHitEvent';

@Injectable()
class GameService {
    constructor(
        private em: EntityManager,
        private domainEventDispatcher: DomainEventDispatcher
    ) {}

    async create(playerName: string) {
        const gameRepository = this.em.getRepository(Game);

        const player = Player.create(randomUUID(), playerName);
        const game = Game.create(randomUUID(), player, 2);

        await gameRepository.persistAndFlush(game);

        return {
            gameId: game.id,
            playerId: player.id
        };
    }

    async join(playerName: string, gameId: string) {
        const gameRepository = this.em.getRepository(Game);
        const game = await gameRepository.findOne(gameId);

        if (!game) {
            throw new Error('Game does not exist');
        }

        const player = Player.create(randomUUID(), playerName);

        game.join(player, new Date());

        await gameRepository.flush();

        game.events.forEach((event) =>
            this.domainEventDispatcher.dispatch(event)
        );

        return {
            playerId: player.id
        };
    }

    async hundleMarkedCellHitEvent(event: MarkedCellHitEvent) {
        const gameRepository = this.em.getRepository(Game);

        const game = await gameRepository.findOne(event.gameId);

        if (!game) {
            throw new Error('Game does not exist');
        }

        game.increasePlayerScore(event.playerId, new Date());

        gameRepository.flush();
    }
}

export default GameService;
