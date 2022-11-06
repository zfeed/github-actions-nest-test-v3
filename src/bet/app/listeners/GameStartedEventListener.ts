import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameStartedEvent } from '../../../integration';
import GameStartedEventHandler from '../../core/handlers/GameStartedEventHandler';

@Injectable()
export default class GameStartedEventListener {
    constructor(private gameStartedEventHandler: GameStartedEventHandler) {}

    @OnEvent(GameStartedEvent.type, { async: true })
    handle(event: GameStartedEvent) {
        this.gameStartedEventHandler.handle(event);
    }
}
