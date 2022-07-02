import Field from '../../../domain/field/Field';
import SessionDTO from './SessionDTO';

export default class FieldDTO {
    private constructor(
        public readonly id: string,
        public readonly playerIds: ReadonlyArray<string>,
        public readonly gameId: string,
        public readonly markedCellPosition: number,
        public readonly size: number,
        public readonly session: SessionDTO
    ) {}

    static create(field: Field) {
        return new this(
            field.id,
            [...field.getPlayerIds()],
            field.getGameId(),
            field.getMarkedCellPosition(),
            field.getSize(),
            SessionDTO.create(field.getSession())
        );
    }
}
