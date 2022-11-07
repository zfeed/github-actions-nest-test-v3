import { Module } from '@nestjs/common';
import ServerSentEvents from './ServerSentEvents';
import ServerSentEventsController from './ServerSentEventsController';

@Module({
    imports: [],
    exports: [ServerSentEvents],
    controllers: [ServerSentEventsController],
    providers: [ServerSentEvents]
})
export default class ServerSentEventsModule {}
