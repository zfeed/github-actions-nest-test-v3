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

    private constructor(
        id: string,
        maxPlayers: number,
        players: ReadonlyArray<PlayerDTO>,
        session: undefined | SessionDTO
    ) {
        this.id = id;
        this.maxPlayers = maxPlayers;
        this.players = players;
        this.session = session;
    }

    static create(game: Game) {
        const session = game.getSession();

        return new this(
            game.id,
            game.maxPlayers,
            game.getPlayers().map((player) => PlayerDTO.create(player)),
            session ? SessionDTO.create(session) : undefined
        );
    }
}
