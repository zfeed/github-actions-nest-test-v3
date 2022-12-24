import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MatchStartedEvent } from '../../../gaming';
import { MatchStartedEventHandler } from '../../core/handlers';
import { Message } from '../../../../packages/message-bus';
import { MatchStartedDTO } from './dtos';

@Controller()
export class MatchStartedEventListener {
    constructor(private matchStartedEventHandler: MatchStartedEventHandler) {}

    @EventPattern(MatchStartedEvent.type)
    async handle(message: Message) {
        const data = (await message.value) as unknown as MatchStartedDTO;

        const event = new MatchStartedEvent(
            data.id,
            data.minutesToPlay,
            new Date(data.startedAt),
            data.matchId,
            data.playersId
        );

        await this.matchStartedEventHandler.handle(event);
    }
}
