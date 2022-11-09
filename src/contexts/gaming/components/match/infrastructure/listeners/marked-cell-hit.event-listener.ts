import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MarkedCellHitEvent } from '../../../field/core/domain/events';
import { MarkedCellHitEventHandler } from '../../core/handlers';

@Injectable()
export class MarkedCellHitEventListener {
    constructor(private markedCellHitEventHandler: MarkedCellHitEventHandler) {}

    @OnEvent(MarkedCellHitEvent.type, { async: true })
    handle(event: MarkedCellHitEvent) {
        return this.markedCellHitEventHandler.handle(event);
    }
}
