import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function main() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'humsters',
                brokers: ['localhost:9093']
            }
        }
    });

    await app.startAllMicroservices();

    const config = new DocumentBuilder()
        .setTitle('Humsters Game')
        .setDescription('')
        .setVersion('0.1.0')
        .addTag('Public API')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.APP_PORT);
}

main();
