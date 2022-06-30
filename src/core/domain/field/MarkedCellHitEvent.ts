import Game from '../game/Game';

export default class MarkedCellHitEvent {
    public readonly playerId: string;

    public readonly cellPosition: number;

    public readonly gameId: Game['id'];

    public readonly type: 'MARKED_CELL_HIT' = 'MARKED_CELL_HIT';

    constructor(playerId: string, gameId: Game['id'], cellPosition: number) {
        this.playerId = playerId;
        this.gameId = gameId;
        this.cellPosition = cellPosition;
    }
}
