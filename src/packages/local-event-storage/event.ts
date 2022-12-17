export class Event {
    private constructor(
        readonly id: string,
        readonly json: string,
        readonly type: string,
        readonly createdAt: Date
    ) {}

    public static create(
        id: string,
        json: string,
        type: string,
        createdAt: Date
    ) {
        return new Event(id, json, type, createdAt);
    }
}
