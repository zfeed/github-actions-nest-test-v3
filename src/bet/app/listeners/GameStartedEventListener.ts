import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameStartedEvent } from '../../../integration';
import BetService from '../../core/services/BetService/BetService';

@Injectable()
export default class GameStartedEventListener {
    constructor(private betService: BetService) {}

    @OnEvent(GameStartedEvent.type, { async: true })
    handle(event: GameStartedEvent) {
        this.betService.handleGameStartedEvent(event);
    }
}
