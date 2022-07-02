import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import GameStartedEvent from '../../../core/domain/game/GameStartedEvent';
import FieldService from '../../../core/services/FieldService/FieldService';

@Injectable()
export default class MarkedCellHitEventListner {
    constructor(private fieldService: FieldService) {}
    @OnEvent(GameStartedEvent.type, { async: true })
    handle(event: GameStartedEvent) {
        return this.fieldService.hundleGameStartedEvent(event);
    }
}
