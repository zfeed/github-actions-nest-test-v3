import Result from '../../common/Result';
import GameDTO from '../../common/entities/GameDTO';
import PlayerDTO from '../../common/entities/PlayerDTO';
import Game from '../../../domain/game/Game';
import Player from '../../../domain/game/Player';

const GAME_NOT_FOUND = 'GAME_NOT_FOUND' as const;

export class GameNotFoundResult {
    static create(): Result<
        null,
        { id: typeof GAME_NOT_FOUND; message: string }
    > {
        return Result.create(null, {
            id: GAME_NOT_FOUND,
            message: 'Game not found'
        });
    }
}

export class GameJoinedResult {
    static create(
        game: Game,
        player: Player
    ): Result<{ game: GameDTO; player: PlayerDTO }, null> {
        return Result.create(
            { game: GameDTO.create(game), player: PlayerDTO.create(player) },
            null
        );
    }
}

const GAME_ALREADY_STARTED = 'GAME_ALREADY_STARTED' as const;

export class GameAlreadyStartedResult {
    static create(): Result<
        null,
        { id: typeof GAME_ALREADY_STARTED; message: string }
    > {
        return Result.create(null, {
            id: GAME_ALREADY_STARTED,
            message: 'Game has been already started'
        });
    }
}

const GAME_IS_FULL = 'GAME_IS_FULL' as const;

export class GameIsFullResult {
    static create(): Result<
        null,
        { id: typeof GAME_IS_FULL; message: string }
    > {
        return Result.create(null, {
            id: GAME_IS_FULL,
            message: 'Max number of playes has been already joined the game'
        });
    }
}
