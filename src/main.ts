import * as f from './packages/domain';

console.log(f);

// async function main() {
//     const app = await NestFactory.create(AppModule);

//     app.connectMicroservice({
//         transport: Transport.KAFKA,
//         options: kafka
//     });

//     await app.startAllMicroservices();

//     const config = new DocumentBuilder()
//         .setTitle(swagger.title)
//         .setDescription(swagger.description)
//         .setVersion(swagger.version)
//         .addTag(swagger.tag)
//         .build();

//     const document = SwaggerModule.createDocument(app, config);

//     SwaggerModule.setup('api', app, document);

//     await app.listen(process.env.APP_PORT);
// }

// main();
