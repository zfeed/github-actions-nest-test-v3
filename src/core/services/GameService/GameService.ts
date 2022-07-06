import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { EventEmitter2 } from '@nestjs/event-emitter';
import Game from '../../domain/game/Game';
import Player from '../../domain/game/Player';
import MarkedCellHitEvent from '../../domain/field/MarkedCellHitEvent';
import CreateResult from './results/CreateResult';
import * as JoinResults from './results/JoinResult';

@Injectable()
class GameService {
    constructor(
        private em: EntityManager,
        private domainEventDispatcher: EventEmitter2
    ) {}

    async create(playerName: string): Promise<CreateResult> {
        const gameRepository = this.em.getRepository(Game);

        const player = Player.create(randomUUID(), playerName);
        const game = Game.create(randomUUID(), player, 2);

        await gameRepository.persistAndFlush(game);

        return CreateResult.create(game);
    }

    async join(playerName: string, gameId: string) {
        const gameRepository = this.em.getRepository(Game);
        const game = await gameRepository.findOne(gameId);

        if (!game) {
            return JoinResults.GameNotFoundResult.create();
        }

        if (game.isGameStarted()) {
            return JoinResults.GameAlreadyStartedResult.create();
        }

        if (game.allPlayersJoined()) {
            return JoinResults.GameIsFullResult.create();
        }

        const player = Player.create(randomUUID(), playerName);

        game.join(player, new Date());

        await gameRepository.flush();

        game.events.forEach((event) =>
            this.domainEventDispatcher.emit(event.type, event)
        );

        return JoinResults.GameJoinedResult.create(game, player);
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
