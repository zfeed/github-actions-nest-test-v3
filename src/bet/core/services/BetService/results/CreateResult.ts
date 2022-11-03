import { ApiProperty } from '@nestjs/swagger';
import IResult from '../../common/Result';
import BetDTO from '../../common/entities/BetDTO';
import Bet from '../../../domain/bet/Bet';

class CreateResultData {
    @ApiProperty({ type: BetDTO })
    public readonly bet: BetDTO;

    constructor(bet: BetDTO) {
        this.bet = bet;
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

    static create(bet: Bet) {
        const data = new CreateResultData(BetDTO.create(bet));

        return new this(data, null);
    }
}
