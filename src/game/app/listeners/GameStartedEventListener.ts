import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import GameStartedEvent from '../../core/domain/game/GameStartedEvent';
import GameStartedEventHandler from '../../core/handlers/GameStartedEventHandler';
import ServerSentEvents from '../ServerSentEvents/ServerSentEvents';

@Injectable()
export default class MarkedCellHitEventListner {
    constructor(
        private gameStartedEventHandler: GameStartedEventHandler,
        private serverSentEvents: ServerSentEvents
    ) {}
    @OnEvent(GameStartedEvent.type, { async: true })
    handle(event: GameStartedEvent) {
        this.serverSentEvents.broadсast(event.gameId, event);
        return this.gameStartedEventHandler.handle(event);
    }
}
