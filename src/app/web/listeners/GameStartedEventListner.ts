import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import GameStartedEvent from '../../../core/domain/game/GameStartedEvent';
import FieldService from '../../../core/services/FieldService/FieldService';
import ServerSentEvents from '../ServerSentEvents/ServerSentEvents';
import * as utils from '../utils';

@Injectable()
export default class MarkedCellHitEventListner {
    constructor(
        private fieldService: FieldService,
        private serverSentEvents: ServerSentEvents
    ) {}
    @OnEvent(GameStartedEvent.type, { async: true })
    handle(event: GameStartedEvent) {
        this.serverSentEvents.broadсast(
            utils.createNamespace(event.gameId),
            event
        );
        return this.fieldService.hundleGameStartedEvent(event);
    }
}
