import { ClientsModule, Transport, ClientKafka } from '@nestjs/microservices';

export { KafkaMessage as Message } from '@nestjs/microservices/external/kafka.interface';

export const MESSAGE_BUS = Symbol('MESSAGE_BUS');

export type Client = ClientKafka;

export const MessageBus = ClientsModule.register([
    {
        name: MESSAGE_BUS,
        transport: Transport.KAFKA,
        options: {
            producerOnlyMode: true,
            client: {
                clientId: 'humsters',
                brokers: ['localhost:9093']
            },
            consumer: {
                groupId: 'humsters-consumer'
            }
        }
    }
]);
