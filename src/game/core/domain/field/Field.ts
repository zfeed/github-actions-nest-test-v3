import Entity from '../../../../packages/Entity';
import Game from '../game/Game';
import MarkedCellHitEvent from './MarkedCellHitEvent';
import FieldMarkedCellPositionChanged from './FieldMarkedCellPositionChanged';
import Player from '../game/Player';
import Session from '../common/Session';

class Field extends Entity<
    MarkedCellHitEvent | FieldMarkedCellPositionChanged
> {
    protected constructor(
        id: Field['id'],
        private playerIds: string[],
        private gameId: string,
        private session: Session,
        private markedCellPosition: number,
        private size: number
    ) {
        super(id);
    }

    private static getNextCellPosition(
        prevPosition: number,
        size: number
    ): number {
        const min = 0;
        const max = size - 1;

        for (;;) {
            const nextCellPosition = Math.floor(
                Math.random() * (max - min + 1) + min
            );

            if (nextCellPosition !== prevPosition) {
                return nextCellPosition;
            }
        }
    }

    getPlayerIds(): ReadonlyArray<string> {
        return this.playerIds;
    }

    getGameId() {
        return this.gameId;
    }

    getSession(): Readonly<Session> {
        return this.session;
    }

    getSize() {
        return this.size;
    }

    getMarkedCellPosition() {
        return this.markedCellPosition;
    }

    playerExists(playerId: string) {
        return this.playerIds.includes(playerId);
    }

    hit(cellPosition: number, playerId: string, now: Date) {
        if (this.playerExists(playerId) === false) {
            throw new Error('Player does not exits');
        }

        if (this.session.isOver(now)) {
            throw new Error('Game is finished');
        }

        const hit = this.markedCellPosition === cellPosition;

        if (hit) {
            this.markedCellPosition = Field.getNextCellPosition(
                cellPosition,
                this.size
            );

            this.pushEvent(
                new MarkedCellHitEvent(playerId, this.gameId, cellPosition)
            );
        }
    }

    changeMarkedCellPosition(now: Date): void {
        if (this.session.isOver(now)) {
            throw new Error('Game is finished');
        }

        this.markedCellPosition = Field.getNextCellPosition(
            this.markedCellPosition,
            this.size
        );

        this.pushEvent(
            new FieldMarkedCellPositionChanged(
                this.markedCellPosition,
                this.gameId,
                this.id
            )
        );
    }

    public static create(
        id: Field['id'],
        playerIds: Player['id'][],
        gameId: Game['id'],
        size: number,
        session: Session
    ): Field {
        const markedCellPosition = Field.getNextCellPosition(-1, size);

        return new Field(
            id,
            playerIds,
            gameId,
            session,
            markedCellPosition,
            size
        );
    }
}

export default Field;
