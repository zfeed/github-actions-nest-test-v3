import { Controller, Sse, Param } from '@nestjs/common';

import ServerSentEvents from '../../ServerSentEvents/ServerSentEvents';
import * as utils from '../../utils';

@Controller('events')
export default class EventsController {
    constructor(private serverSentEvents: ServerSentEvents) {}

    @Sse('sse/game/:gameId/player/:playerId')
    connectToSSE(
        @Param('gameId') gameId: string,
        @Param('playerId') playerId: string
    ) {
        setInterval(() => {
            this.serverSentEvents.broadсast(
                utils.createNamespace(playerId, gameId),
                {
                    data: 'some data'
                }
            );
        }, 2000);

        return this.serverSentEvents.connect(
            utils.createNamespace(playerId, gameId)
        );
    }
}
