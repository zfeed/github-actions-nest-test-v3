import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import FieldMarkedCellPositionChanged from '../../../core/domain/field/FieldMarkedCellPositionChanged';
import ServerSentEvents from '../ServerSentEvents/ServerSentEvents';
import * as utils from '../utils';

@Injectable()
export default class FieldMarkedCellPositionChangedListner {
    constructor(private serverSentEvents: ServerSentEvents) {}

    @OnEvent(FieldMarkedCellPositionChanged.type, { async: true })
    handle(event: FieldMarkedCellPositionChanged) {
        this.serverSentEvents.broadсast(
            utils.createNamespace(event.gameId),
            event
        );
    }
}
