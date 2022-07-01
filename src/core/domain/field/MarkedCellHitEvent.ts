import Game from '../game/Game';

const TYPE = 'MARKED_CELL_HIT' as const;

export default class MarkedCellHitEvent {
    public readonly playerId: string;

    public readonly cellPosition: number;

    public readonly gameId: Game['id'];

    public readonly type = TYPE;
    static readonly type = TYPE;

    constructor(playerId: string, gameId: Game['id'], cellPosition: number) {
        this.playerId = playerId;
        this.gameId = gameId;
        this.cellPosition = cellPosition;
    }
}
