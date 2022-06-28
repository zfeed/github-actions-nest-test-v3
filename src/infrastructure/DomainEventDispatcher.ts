import IDomainEventDispatcher, { Event } from '../core/DomainEventDispatcher';

export default class DomainEventDispatcher implements IDomainEventDispatcher {
    private subscribers: ((event: Event) => void)[] = [];

    dispatch(event: Event) {
        this.subscribers.forEach((subscriber) =>
            setTimeout(() => subscriber(event))
        );
    }

    subscribe(callback: (event: Event) => void) {
        this.subscribers.push(callback);
    }
}
