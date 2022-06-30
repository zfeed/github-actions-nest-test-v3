import Player from './Player';
import Entity from '../common/Entity';
import Session from '../common/Session';
import GameStartedEvent from './GameStartedEvent';

class Game extends Entity<GameStartedEvent> {
    private constructor(
        id: Game['id'],
        private players: Player[],
        private session: Session | null,
        private readonly maxPlayers: number
    ) {
        super(id);
    }

    private allPlayersJoined(): boolean {
        return this.players.length === this.maxPlayers;
    }

    private isPlayerAlreadyJoined(player: Player): boolean {
        return this.players.some(({ id }) => id === player.id);
    }

    private start(now: Date): void {
        const minutesToPlay = 1;
        this.session = Session.create(minutesToPlay, now);

        this.pushEvent(
            new GameStartedEvent(
                minutesToPlay,
                this.session.startedAt,
                this.id,
                this.players.map(({ id }) => id)
            )
        );
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    getSession(): Readonly<Session | null> {
        return this.session;
    }

    getPlayers(): ReadonlyArray<
        StripInternalMethods<Player, 'increaseScoreBy'>
        // eslint-disable-next-line indent
    > {
        return this.players;
    }

    increasePlayerScore(playerId: Player['id'], now: Date): void {
        const player = this.players.find(({ id }) => id === playerId);

        if (player === undefined) {
            throw Error('Player does not exist');
        }

        if (this.session === null) {
            throw Error('Game not started yet');
        }

        if (this.session.isOver(now)) {
            throw Error('Game is finished');
        }

        player.increaseScoreBy(1);
    }

    join(player: Player, now: Date): void {
        if (this.session !== null) {
            throw new Error('Game already started');
        }

        if (this.allPlayersJoined()) {
            throw new Error('Max number of players reached');
        }

        if (this.isPlayerAlreadyJoined(player)) {
            throw new Error('Player already joined');
        }

        if (player.getScore() !== 0) {
            throw new Error('Player must have 0 score');
        }

        this.players.push(player);

        if (this.allPlayersJoined()) {
            this.start(now);
        }
    }

    static create(
        gameId: Game['id'],
        player: Player,
        maxPlayers: number
    ): Game {
        if (player.getScore() !== 0) {
            throw new Error('Player must have 0 score');
        }

        return new Game(gameId, [player], null, maxPlayers);
    }
}

export default Game;
