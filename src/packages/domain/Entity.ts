export interface Event {
    type: string;
}

class Entity<E extends Event> {
    #events: E[] = [];

    get events(): ReadonlyArray<E> {
        // eslint-disable-next-line no-underscore-dangle
        return this.#events;
    }

    // eslint-disable-next-line no-useless-constructor
    protected constructor(readonly id: string) {}

    protected pushEvent(event: E) {
        // We use MikroORM. It doesn't creates instances by Object.create
        // so setting default value "_event = []" doesn't work
        // It's possible to pass forceCOnstructor: true, but it produces many more bugs
        // eslint-disable-next-line no-underscore-dangle
        if (this.#events === undefined) {
            // eslint-disable-next-line no-underscore-dangle
            this.#events = [];
        }

        // eslint-disable-next-line no-underscore-dangle
        this.#events.push(event);
    }
}

export { Entity };
