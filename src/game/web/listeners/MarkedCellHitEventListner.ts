import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import MarkedCellHitEvent from '../../core/domain/field/MarkedCellHitEvent';
import GameService from '../../core/services/GameService/GameService';

@Injectable()
export default class MarkedCellHitEventListner {
    constructor(private gameService: GameService) {}

    @OnEvent(MarkedCellHitEvent.type, { async: true })
    handle(event: MarkedCellHitEvent) {
        return this.gameService.hundleMarkedCellHitEvent(event);
    }
}
