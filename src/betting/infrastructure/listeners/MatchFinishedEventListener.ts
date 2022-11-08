import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MatchFinishedEvent } from '../../../integration';
import MatchFinishedEventHandler from '../../core/handlers/MatchFinishedEventHandler';

@Injectable()
export default class MatchFinishedEventListener {
    constructor(private matchFinishedEventHandler: MatchFinishedEventHandler) {}

    @OnEvent(MatchFinishedEvent.type, { async: true })
    handle(event: MatchFinishedEvent) {
        this.matchFinishedEventHandler.handle(event);
    }
}
