import { Controller, Sse, Param } from '@nestjs/common';

import ServerSentEvents from './ServerSentEvents';

@Controller('events')
export default class EventsController {
    constructor(private serverSentEvents: ServerSentEvents) {}

    @Sse('sse/game/:matchId')
    connectToSSE(@Param('matchId') matchId: string) {
        return this.serverSentEvents.connect(matchId);
    }
}
