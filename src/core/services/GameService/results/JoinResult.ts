import { ApiProperty } from '@nestjs/swagger';

import IResult from '../../common/Result';
import GameDTO from '../../common/entities/GameDTO';
import PlayerDTO from '../../common/entities/PlayerDTO';
import Game from '../../../domain/game/Game';
import Player from '../../../domain/game/Player';

const GAME_NOT_FOUND = 'GAME_NOT_FOUND' as const;
type GAME_NOT_FOUND = typeof GAME_NOT_FOUND;

class GameNotFoundError {
    @ApiProperty({ type: 'string', default: GAME_NOT_FOUND })
    id = GAME_NOT_FOUND;

    @ApiProperty({ type: 'string' })
    message = 'Game not found';
}

export class GameNotFoundResult
    implements IResult<null, GameNotFoundResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data: null;

    @ApiProperty()
    error: GameNotFoundError;

    private constructor(data: null, error: GameNotFoundResult['error']) {
        this.data = data;
        this.error = error;
    }

    static create() {
        return new this(null, new GameNotFoundError());
    }
}

class GameJoinedResultData {
    @ApiProperty({ type: GameDTO })
    game: GameDTO;

    @ApiProperty({ type: PlayerDTO })
    player: PlayerDTO;

    constructor(game: GameDTO, player: PlayerDTO) {
        this.game = game;
        this.player = player;
    }
}

export class GameJoinedResult
    implements IResult<GameJoinedResult['data'], null>
{
    @ApiProperty({ type: GameJoinedResultData })
    data: GameJoinedResultData;

    @ApiProperty({ type: 'null', default: null })
    error: null;

    private constructor(data: GameJoinedResult['data'], error: null) {
        this.data = data;
        this.error = error;
    }

    static create(game: Game, player: Player) {
        const data = new GameJoinedResultData(
            GameDTO.create(game),
            PlayerDTO.create(player)
        );
        return new this(data, null);
    }
}

const GAME_ALREADY_STARTED = 'GAME_ALREADY_STARTED' as const;
type GAME_ALREADY_STARTED = typeof GAME_ALREADY_STARTED;

class GameAlreadyStartedError {
    @ApiProperty({ type: 'string', default: GAME_NOT_FOUND })
    id = GAME_ALREADY_STARTED;

    @ApiProperty({ type: 'string' })
    message = 'Game has been already started';
}

export class GameAlreadyStartedResult
    implements IResult<null, GameAlreadyStartedResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data: null;

    @ApiProperty({ type: GameAlreadyStartedError })
    error: GameAlreadyStartedError;

    private constructor(data: null, error: GameAlreadyStartedResult['error']) {
        this.data = data;
        this.error = error;
    }

    static create() {
        return new this(null, new GameAlreadyStartedError());
    }
}

const GAME_IS_FULL = 'GAME_IS_FULL' as const;
type GAME_IS_FULL = typeof GAME_IS_FULL;

class GameIsFullError {
    @ApiProperty({ type: 'string', default: GAME_IS_FULL })
    id = GAME_IS_FULL;

    @ApiProperty({ type: 'string' })
    message = 'Max number of playes has been already joined the game';
}

export class GameIsFullResult
    implements IResult<null, GameIsFullResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data: null;

    @ApiProperty({ type: GameIsFullError })
    error: GameIsFullError;

    private constructor(data: null, error: GameIsFullResult['error']) {
        this.data = data;
        this.error = error;
    }

    static create() {
        return new this(null, new GameIsFullError());
    }
}
