import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameFinishedEvent } from '../../../integration';
import BetService from '../../core/services/BetService/BetService';

@Injectable()
export default class GameFinishedEventListener {
    constructor(private betService: BetService) {}

    @OnEvent(GameFinishedEvent.type, { async: true })
    handle(event: GameFinishedEvent) {
        this.betService.handleGameFinishedEvent(event);
    }
}
