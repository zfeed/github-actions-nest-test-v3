import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MarkedCellHitEvent } from '../../../field/core/domain/events';
import { MarkedCellHitEventHandler } from '../../core/handlers';
import { Message } from '../../../../../../packages/message-bus';
import { MarkedCellHitDTO } from './dtos';

@Controller()
export class MarkedCellHitEventListener {
    constructor(private markedCellHitEventHandler: MarkedCellHitEventHandler) {}

    @EventPattern(MarkedCellHitEvent.type)
    async handle(message: Message) {
        const data = message.value as unknown as MarkedCellHitDTO;

        const event = new MarkedCellHitEvent(
            data.id,
            data.playerId,
            data.matchId,
            data.cellPosition
        );

        await this.markedCellHitEventHandler.handle(event);
    }
}
