import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import MarkedCellHitEvent from '../../core/domain/field/MarkedCellHitEvent';
import MarkedCellHitEventHandler from '../../core/handlers/MarkedCellHitEventHandler';

@Injectable()
export default class MarkedCellHitEventListner {
    constructor(private markedCellHitEventHandler: MarkedCellHitEventHandler) {}

    @OnEvent(MarkedCellHitEvent.type, { async: true })
    handle(event: MarkedCellHitEvent) {
        return this.markedCellHitEventHandler.handle(event);
    }
}
