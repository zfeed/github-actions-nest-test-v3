const TYPE = 'MARKED_CELL_HIT' as const;

export class MarkedCellHitEvent {
    public readonly id: string;

    public readonly playerId: string;

    public readonly cellPosition: number;

    public readonly matchId: string;

    public readonly type = TYPE;

    static readonly type = TYPE;

    constructor(
        id: string,
        playerId: string,
        matchId: string,
        cellPosition: number
    ) {
        this.id = id;
        this.playerId = playerId;
        this.matchId = matchId;
        this.cellPosition = cellPosition;
    }
}
