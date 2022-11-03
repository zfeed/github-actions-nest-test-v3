import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import GameStartedEvent from '../../core/domain/game/GameStartedEvent';
import FieldService from '../../core/services/FieldService/FieldService';
import ServerSentEvents from '../ServerSentEvents/ServerSentEvents';

@Injectable()
export default class MarkedCellHitEventListner {
    constructor(
        private fieldService: FieldService,
        private serverSentEvents: ServerSentEvents
    ) {}
    @OnEvent(GameStartedEvent.type, { async: true })
    handle(event: GameStartedEvent) {
        this.serverSentEvents.broadсast(event.gameId, event);
        return this.fieldService.hundleGameStartedEvent(event);
    }
}
