import { randomUUID } from 'node:crypto';

import Game from '../domain/Game';
import Player from '../domain/Player';
import DomainEventDispatcher from '../DomainEventDispatcher';
import GameRepository from '../repositories/GameRepository';
import MarkedCellHitEvent from '../domain/events/MarkedCellHitEvent';

class GameService {
    static create(playerName: string, gameRepository: GameRepository) {
        const player = Player.create(randomUUID(), playerName);
        const game = Game.create(randomUUID(), player, 2);

        gameRepository.save(game);

        return {
            gameId: game.id,
            playerId: player.id
        };
    }

    static join(
        playerName: string,
        gameId: string,
        domainEventDispatcher: DomainEventDispatcher,
        gameRepository: GameRepository
    ) {
        const game = gameRepository.getById(gameId);

        if (!game) {
            throw new Error('Game does not exist');
        }

        const player = Player.create(randomUUID(), playerName);

        game.join(player, new Date());

        gameRepository.save(game);

        game.events.forEach((event) => domainEventDispatcher.dispatch(event));

        return {
            playerId: player.id
        };
    }

    static hundleMarkedCellHitEvent(
        event: MarkedCellHitEvent,
        gameRepository: GameRepository
    ) {
        const game = gameRepository.getById(event.gameId);

        if (!game) {
            throw new Error('Game does not exist');
        }

        game.increasePlayerScore(event.playerId, new Date());

        gameRepository.save(game);
    }
}

export default GameService;
