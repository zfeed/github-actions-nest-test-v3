import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import FieldMarkedCellPositionChanged from '../../core/domain/events/FieldMarkedCellPositionChanged';
import ServerSentEvents from '../../../../../packages/ServerSentEvents/ServerSentEvents';

@Injectable()
export default class FieldMarkedCellPositionChangedListener {
    constructor(private serverSentEvents: ServerSentEvents) {}

    @OnEvent(FieldMarkedCellPositionChanged.type, { async: true })
    handle(event: FieldMarkedCellPositionChanged) {
        this.serverSentEvents.broadсast(event.matchId, event);
    }
}
