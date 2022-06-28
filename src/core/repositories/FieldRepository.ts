import Field from '../domain/Field';

interface FieldRepository {
    getById(id: Field['id']): Field | null;

    save(field: Field): void;
}

export default FieldRepository;
