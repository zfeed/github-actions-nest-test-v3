import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import FieldMarkedCellPositionChanged from '../../core/domain/field/FieldMarkedCellPositionChanged';
import ServerSentEvents from '../ServerSentEvents/ServerSentEvents';

@Injectable()
export default class FieldMarkedCellPositionChangedListener {
    constructor(private serverSentEvents: ServerSentEvents) {}

    @OnEvent(FieldMarkedCellPositionChanged.type, { async: true })
    handle(event: FieldMarkedCellPositionChanged) {
        this.serverSentEvents.broadсast(event.gameId, event);
    }
}
