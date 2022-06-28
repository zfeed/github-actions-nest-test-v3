interface Event {
    type: string;
}

class Entity<E extends Event> {
    #events: E[] = [];

    get events(): ReadonlyArray<E> {
        return this.#events;
    }

    // eslint-disable-next-line no-useless-constructor
    protected constructor(readonly id: string) {}

    pushEvent(event: E) {
        this.#events.push(event);
    }
}

export default Entity;
