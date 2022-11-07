import { ApiProperty } from '@nestjs/swagger';
import IResult from '../../../../../../packages/Result';
import FieldDTO from './dto/FieldDTO';
import Field from '../../domain/Field';

class HitResultData {
    @ApiProperty({ type: FieldDTO })
    public readonly field: FieldDTO;

    constructor(field: FieldDTO) {
        this.field = field;
    }
}

export class HitResult implements IResult<HitResult['data'], null> {
    @ApiProperty({ type: HitResultData })
    data: HitResultData;

    @ApiProperty({ type: 'null', default: null })
    error = null;

    private constructor(data: HitResult['data']) {
        this.data = data;
    }

    static create(field: Field) {
        return new this({ field: FieldDTO.create(field) });
    }
}

const FIELD_NOT_FOUND = 'FIELD_NOT_FOUND' as const;
type FIELD_NOT_FOUND = typeof FIELD_NOT_FOUND;

class FieldNotFoundError {
    @ApiProperty({ type: 'string', default: FIELD_NOT_FOUND })
    id = FIELD_NOT_FOUND;

    @ApiProperty({ type: 'string' })
    message = 'Field is not found';
}

export class FieldNotFoundResult
    implements IResult<null, FieldNotFoundResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data = null;

    @ApiProperty({ type: FieldNotFoundError })
    error = new FieldNotFoundError();

    static create() {
        return new this();
    }
}

const GAME_IS_OVER = 'GAME_IS_OVER' as const;
type GAME_IS_OVER = typeof GAME_IS_OVER;

class GameIsOverError {
    @ApiProperty({ type: 'string', default: GAME_IS_OVER })
    id = GAME_IS_OVER;

    @ApiProperty({ type: 'string' })
    message = 'Game is over';
}

export class GameIsOverResult
    implements IResult<null, GameIsOverResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data = null;

    @ApiProperty({ type: GameIsOverError })
    error = new GameIsOverError();

    static create() {
        return new this();
    }
}

const PLAYER_DOES_NOT_EXIST = 'PLAYER_DOES_NOT_EXIST' as const;
type PLAYER_DOES_NOT_EXIST = typeof PLAYER_DOES_NOT_EXIST;

class PlayerDoesNotExistError {
    @ApiProperty({ type: 'string', default: PLAYER_DOES_NOT_EXIST })
    id = PLAYER_DOES_NOT_EXIST;

    @ApiProperty({ type: 'string' })
    message = 'Game is over';
}

export class PlayerDoesNotExistResult
    implements IResult<null, PlayerDoesNotExistResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data = null;

    @ApiProperty({ type: PlayerDoesNotExistError })
    error = new PlayerDoesNotExistError();

    static create() {
        return new this();
    }
}
