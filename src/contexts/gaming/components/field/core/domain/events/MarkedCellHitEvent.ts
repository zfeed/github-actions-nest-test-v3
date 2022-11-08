const TYPE = 'MARKED_CELL_HIT' as const;

export default class MarkedCellHitEvent {
    public readonly playerId: string;

    public readonly cellPosition: number;

    public readonly matchId: string;

    public readonly type = TYPE;
    static readonly type = TYPE;

    constructor(playerId: string, matchId: string, cellPosition: number) {
        this.playerId = playerId;
        this.matchId = matchId;
        this.cellPosition = cellPosition;
    }
}
