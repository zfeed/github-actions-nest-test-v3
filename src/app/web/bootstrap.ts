import { NestFactory } from '@nestjs/core';
import AppModule from './AppModule';

export default async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
