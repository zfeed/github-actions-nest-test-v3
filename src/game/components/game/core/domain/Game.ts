import Player from './Player';
import Entity from '../../../../../packages/Entity';
import Session from '../../../../shared/Session';
import GameStartedEvent from './events/GameStartedEvent';
import GameFinishedEvent from './events/GameFinishedEvent';
import { MINUTES_TO_PLAY } from '../../../../shared/constants';

class Game extends Entity<GameStartedEvent | GameFinishedEvent> {
    private constructor(
        id: Game['id'],
        private players: Player[],
        private session: Session | undefined,
        public readonly maxPlayers: number,
        private finishedAt: null | Date
    ) {
        super(id);
    }

    allPlayersJoined(): boolean {
        return this.players.length === this.maxPlayers;
    }

    isPlayerAlreadyJoined(player: Player): boolean {
        return this.players.some(({ id }) => id === player.id);
    }

    private start(now: Date): void {
        this.session = Session.create(MINUTES_TO_PLAY, now);

        this.pushEvent(
            new GameStartedEvent(
                MINUTES_TO_PLAY,
                this.session.startedAt,
                this.id,
                this.players.map(({ id }) => id)
            )
        );
    }

    getMaxPlayers(): number {
        return this.maxPlayers;
    }

    // TODO: add this-based type guards
    isFinished() {
        return this.finishedAt !== null;
    }

    getFinishedAt() {
        return this.finishedAt;
    }

    getSession(): Readonly<Session | undefined> {
        return this.session;
    }

    getPlayers(): ReadonlyArray<Player> {
        return this.players;
    }

    increasePlayerScore(playerId: Player['id'], now: Date): void {
        const player = this.players.find(({ id }) => id === playerId);

        if (player === undefined) {
            throw Error('Player does not exist');
        }

        if (this.session === undefined) {
            throw Error('Game not started yet');
        }

        if (this.session.isOver(now)) {
            throw Error('Game is finished');
        }

        player.increaseScoreBy(1);
    }

    // TODO: add this-based type guards
    isGameStarted() {
        return this.session !== undefined;
    }

    join(player: Player, now: Date): void {
        if (this.isGameStarted()) {
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

    finish(now: Date) {
        if (this.isGameStarted() === false) {
            throw new Error('Game not started yet');
        }

        if (this.session?.isOver(now) === false) {
            throw new Error('Game is not over yet');
        }

        if (this.isFinished() === true) {
            throw new Error('Game is finished already');
        }

        this.finishedAt = now;

        this.pushEvent(
            new GameFinishedEvent(
                MINUTES_TO_PLAY,
                this.session!.startedAt,
                this.id,
                this.players.map((player) => ({
                    id: player.id,
                    score: player.getScore()
                })),
                this.finishedAt
            )
        );
    }

    static create(
        gameId: Game['id'],
        player: Player,
        maxPlayers: number
    ): Game {
        if (player.getScore() !== 0) {
            throw new Error('Player must have 0 score');
        }

        return new Game(gameId, [player], undefined, maxPlayers, null);
    }
}

export default Game;
