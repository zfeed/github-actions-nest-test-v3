import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MatchStartedEvent } from '../../../gaming';
import { MatchStartedEventHandler } from '../../core/handlers';

@Injectable()
export class MatchStartedEventListener {
    constructor(private matchStartedEventHandler: MatchStartedEventHandler) {}

    @OnEvent(MatchStartedEvent.type, { async: true })
    handle(event: MatchStartedEvent) {
        this.matchStartedEventHandler.handle(event);
    }
}
