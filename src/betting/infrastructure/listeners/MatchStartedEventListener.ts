import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MatchStartedEvent } from '../../../integration';
import MatchStartedEventHandler from '../../core/handlers/MatchStartedEventHandler';

@Injectable()
export default class MatchStartedEventListener {
    constructor(private matchStartedEventHandler: MatchStartedEventHandler) {}

    @OnEvent(MatchStartedEvent.type, { async: true })
    handle(event: MatchStartedEvent) {
        this.matchStartedEventHandler.handle(event);
    }
}
