interface IError {
    id: string;
    message: string;
}

export default interface IResult<T, E extends IError | null> {
    readonly data: T;
    readonly error: E | null;
}
