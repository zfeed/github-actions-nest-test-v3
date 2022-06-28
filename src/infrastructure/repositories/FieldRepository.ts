import Field from '../../core/domain/Field';
import IFieldRepository from '../../core/repositories/FieldRepository';

class FieldRepository implements IFieldRepository {
    storage: typeof process['fieldStorage'];

    constructor() {
        this.storage = process.fieldStorage;
    }

    getById(id: Field['id']): Field | null {
        if (this.storage[id]) {
            return this.storage[id] as Field;
        }

        return null;
    }

    save(field: Field): void {
        this.storage[field.id] = field;
    }
}

export default FieldRepository;
