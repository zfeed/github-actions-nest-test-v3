import { ApiProperty } from '@nestjs/swagger';
import Bet from '../../../domain/bet/Bet';
import { code } from '../../../domain/bet/Status';

export default class GameDTO {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly amount: number;

    @ApiProperty()
    public playerIds: ReadonlyArray<string>;

    @ApiProperty()
    public winnerPlayerId: string | null;

    @ApiProperty()
    public status: code;

    private constructor(
        id: string,
        amount: number,
        playerIds: ReadonlyArray<string>,
        winnerPlayerId: string | null,
        status: code
    ) {
        this.id = id;
        this.amount = amount;
        this.playerIds = playerIds;
        this.winnerPlayerId = winnerPlayerId;
        this.status = status;
    }

    static create(bet: Bet) {
        return new this(
            bet.id,
            bet.amount,
            bet.playerIds,
            bet.getWinnerPlayerId(),
            bet.getStatus().getValue()
        );
    }
}
