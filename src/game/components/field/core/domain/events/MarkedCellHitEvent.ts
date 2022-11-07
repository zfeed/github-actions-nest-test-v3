const TYPE = 'MARKED_CELL_HIT' as const;

export default class MarkedCellHitEvent {
    public readonly playerId: string;

    public readonly cellPosition: number;

    public readonly gameId: string;

    public readonly type = TYPE;
    static readonly type = TYPE;

    constructor(playerId: string, gameId: string, cellPosition: number) {
        this.playerId = playerId;
        this.gameId = gameId;
        this.cellPosition = cellPosition;
    }
}
