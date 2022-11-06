import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameFinishedEvent } from '../../../integration';
import GameFinishedEventHandler from '../../core/handlers/GameFinishedEventHandler';

@Injectable()
export default class GameFinishedEventListener {
    constructor(private gameFinishedEventHandler: GameFinishedEventHandler) {}

    @OnEvent(GameFinishedEvent.type, { async: true })
    handle(event: GameFinishedEvent) {
        this.gameFinishedEventHandler.handle(event);
    }
}
