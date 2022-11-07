import Entity from '../../../../packages/Entity';
import Status from './Status';
import BetFinishedEvent from './BetFinishedEvent';

class Bet extends Entity<BetFinishedEvent> {
    protected constructor(
        id: string,
        public readonly gameId: string,
        public readonly amount: number,
        public playerIds: ReadonlyArray<string>,
        private winnerPlayerId: string | null,
        private status: Status
    ) {
        super(id);
    }

    getStatus() {
        return this.status;
    }

    getWinnerPlayerId() {
        return this.winnerPlayerId;
    }

    finishBet(winnerPlayerId: string) {
        if (this.status.isFinished()) {
            throw new Error('Bet is finished laready');
        }

        this.winnerPlayerId = winnerPlayerId;
        this.status = Status.create(Status.code.FINISHED);

        this.pushEvent(
            new BetFinishedEvent(
                this.id,
                this.gameId,
                this.amount,
                this.playerIds,
                winnerPlayerId
            )
        );
    }

    public static create(
        id: string,
        gameId: string,
        amount: number,
        playerIds: string[]
    ): Bet {
        const status = Status.create(Status.code.ACTIVE);

        return new Bet(id, gameId, amount, playerIds, null, status);
    }
}

export default Bet;
