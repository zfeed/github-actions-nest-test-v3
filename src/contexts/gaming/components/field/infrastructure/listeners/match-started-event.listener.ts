import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MatchStartedEvent } from '../../../match/core/domain/events';
import { MatchStartedEventHandler } from '../../core/handlers';

@Injectable()
export class MatchStartedEventListener {
    constructor(private matchStartedEventHandler: MatchStartedEventHandler) {}
    @OnEvent(MatchStartedEvent.type, { async: true })
    handle(event: MatchStartedEvent) {
        return this.matchStartedEventHandler.handle(event);
    }
}
