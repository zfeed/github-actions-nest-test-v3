import FieldMarkedCellPositionChanged from './domain/events/FieldMarkedCellPositionChanged';
import MarkedCellHitEvent from './domain/events/MarkedCellHitEvent';
import GameStartedEvent from './domain/events/GameStartedEvent';

export type Event =
    | FieldMarkedCellPositionChanged
    | MarkedCellHitEvent
    | GameStartedEvent;

export default interface DomainEventDispatcher {
    dispatch(event: Event): void;

    subscribe(callback: (event: Event) => void): void;
}
