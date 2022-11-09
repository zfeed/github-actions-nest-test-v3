import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FieldMarkedCellPositionChangedEvent } from '../../core/domain/events';
import { ServerSentEvents } from '../../../../../../packages/server-sent-events';

@Injectable()
export class FieldMarkedCellPositionChangedListener {
    constructor(private serverSentEvents: ServerSentEvents) {}

    @OnEvent(FieldMarkedCellPositionChangedEvent.type, { async: true })
    handle(event: FieldMarkedCellPositionChangedEvent) {
        this.serverSentEvents.broadсast(event.matchId, event);
    }
}
