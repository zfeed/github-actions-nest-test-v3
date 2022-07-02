import Result from '../../common/Result';
import FieldDTO from '../../common/entities/FieldDTO';
import Field from '../../../domain/field/Field';

export class HitResult {
    static create(field: Field): Result<
        {
            field: FieldDTO;
        },
        null
    > {
        return Result.create({ field: FieldDTO.create(field) }, null);
    }
}

const FIELD_NOT_FOUND = 'FIELD_NOT_FOUND' as const;

export class FieldNotFoundResult {
    static create(): Result<
        null,
        { id: typeof FIELD_NOT_FOUND; message: string }
    > {
        return Result.create(null, {
            id: FIELD_NOT_FOUND,
            message: 'Field is not found'
        });
    }
}

const GAME_IS_OVER = 'GAME_IS_OVER' as const;

export class GameIsOverResult {
    static create(): Result<
        null,
        { id: typeof GAME_IS_OVER; message: string }
    > {
        return Result.create(null, {
            id: GAME_IS_OVER,
            message: 'Game is over'
        });
    }
}

const PLAYER_DOES_NOT_EXIST = 'PLAYER_DOES_NOT_EXIST' as const;

export class PlayerDoesNotExistResult {
    static create(): Result<
        null,
        { id: typeof PLAYER_DOES_NOT_EXIST; message: string }
    > {
        return Result.create(null, {
            id: PLAYER_DOES_NOT_EXIST,
            message: 'Player does not exist in this field'
        });
    }
}
