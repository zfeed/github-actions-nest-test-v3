import Game from '../../../domain/game/Game';
import PlayerDTO from './PlayerDTO';
import SessionDTO from './SessionDTO';

export default class GameDTO {
    private constructor(
        public readonly id: string,
        public readonly maxPlayers: number,
        public readonly players: ReadonlyArray<PlayerDTO>,
        public readonly session: undefined | SessionDTO
    ) {}

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
