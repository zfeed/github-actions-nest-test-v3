const TYPE = 'FIELD_MARKED_CELL_POSITION_CHANGED' as const;

export default class FieldMarkedCellPositionChanged {
    public readonly type = TYPE;
    static readonly type = TYPE;

    public readonly newMarkedCellPosition: number;

    public readonly gameId: string;

    public readonly fieldId: string;

    constructor(
        newMarkedCellPosition: number,
        gameId: string,
        fieldId: string
    ) {
        this.newMarkedCellPosition = newMarkedCellPosition;
        this.gameId = gameId;
        this.fieldId = fieldId;
    }
}
