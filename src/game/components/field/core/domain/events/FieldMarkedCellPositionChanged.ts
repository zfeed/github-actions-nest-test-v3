const TYPE = 'FIELD_MARKED_CELL_POSITION_CHANGED' as const;

export default class FieldMarkedCellPositionChanged {
    public readonly type = TYPE;
    static readonly type = TYPE;

    public readonly newMarkedCellPosition: number;

    public readonly matchId: string;

    public readonly fieldId: string;

    constructor(
        newMarkedCellPosition: number,
        matchId: string,
        fieldId: string
    ) {
        this.newMarkedCellPosition = newMarkedCellPosition;
        this.matchId = matchId;
        this.fieldId = fieldId;
    }
}
