interface IError {
    id: string;
    message: string;
}

export default class Result<T, E extends IError | null> {
    protected constructor(
        public readonly data: T,
        public readonly error: E | null
    ) {}

    static create<T, E extends IError | null>(data: T, error: E) {
        if (
            (data === null && error === null) ||
            (data !== null && error !== null)
        ) {
            throw new Error('One of the properties must be null');
        }

        return new this(data, error);
    }
}
