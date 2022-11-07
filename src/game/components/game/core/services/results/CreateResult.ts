import { ApiProperty } from '@nestjs/swagger';
import IResult from '../../../../../../packages/Result';
import GameDTO from '../dtos/GameDTO';
import Game from '../../domain/Game';

class CreateResultData {
    @ApiProperty({ type: GameDTO })
    public readonly game: GameDTO;

    constructor(game: GameDTO) {
        this.game = game;
    }
}

export default class CreateResult
    implements IResult<CreateResult['data'], null>
{
    @ApiProperty({
        type: CreateResultData
    })
    data: CreateResultData;

    @ApiProperty({ type: 'null', default: null })
    error: null;

    private constructor(data: CreateResult['data'], error: null) {
        this.data = data;
        this.error = error;
    }

    static create(game: Game) {
        const data = new CreateResultData(GameDTO.create(game));

        return new this(data, null);
    }
}
