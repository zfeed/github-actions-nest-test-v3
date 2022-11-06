interface Event {
    type: string;
}

class BettingEntity<E extends Event> {
    _events: E[] = [];

    get events(): ReadonlyArray<E> {
        return this._events;
    }

    // eslint-disable-next-line no-useless-constructor
    protected constructor(readonly id: string) {}

    protected pushEvent(event: E) {
        // We use MikroORM. It doesn't creates instances by Object.create
        // so setting default value "_event = []" doesn't work
        // It's possible to pass forceCOnstructor: true, but it produces many more bugs
        if (this._events === undefined) {
            this._events = [];
        }

        this._events.push(event);
    }
}

export default BettingEntity;
export { BettingEntity };
