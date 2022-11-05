import { ApiProperty } from '@nestjs/swagger';
import Game from '../../../domain/game/Game';
import PlayerDTO from './PlayerDTO';
import SessionDTO from './SessionDTO';
import { MAX_PLAYERS } from '../../../constants';

export default class GameDTO {
    @ApiProperty()
    public readonly id: string;
    @ApiProperty({ default: MAX_PLAYERS })
    public readonly maxPlayers: number;

    @ApiProperty({ type: [PlayerDTO] })
    public readonly players: ReadonlyArray<PlayerDTO>;
    @ApiProperty({
        type: SessionDTO,
        nullable: true,
        description:
            "It's populated when all player goined the game and it started"
    })
    public readonly session: undefined | SessionDTO;

    @ApiProperty()
    public readonly finishedAt: string | null;

    private constructor(
        id: string,
        maxPlayers: number,
        players: ReadonlyArray<PlayerDTO>,
        session: undefined | SessionDTO,
        finishedAt: string | null
    ) {
        this.id = id;
        this.maxPlayers = maxPlayers;
        this.players = players;
        this.session = session;
        this.finishedAt = finishedAt;
    }

    static create(game: Game) {
        const session = game.getSession();
        const finishedAt = game.getFinishedAt();

        return new this(
            game.id,
            game.maxPlayers,
            game.getPlayers().map((player) => PlayerDTO.create(player)),
            session ? SessionDTO.create(session) : undefined,
            finishedAt ? finishedAt.toISOString() : finishedAt
        );
    }
}
