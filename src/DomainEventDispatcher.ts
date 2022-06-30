import FieldMarkedCellPositionChanged from './core/domain/field/FieldMarkedCellPositionChanged';
import MarkedCellHitEvent from './core/domain/field/MarkedCellHitEvent';
import GameStartedEvent from './core/domain/game/GameStartedEvent';

export type Event =
    | FieldMarkedCellPositionChanged
    | MarkedCellHitEvent
    | GameStartedEvent;

export default class DomainEventDispatcher {
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
