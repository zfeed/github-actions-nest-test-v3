import { Controller, Sse, Param } from '@nestjs/common';

import ServerSentEvents from './ServerSentEvents';

@Controller('events')
export default class EventsController {
    constructor(private serverSentEvents: ServerSentEvents) {}

    @Sse('sse/game/:gameId')
    connectToSSE(@Param('gameId') gameId: string) {
        return this.serverSentEvents.connect(gameId);
    }
}
