import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Swagger Service')
        .setDescription('Main microservice for documentation')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
        explorer: true,
        swaggerOptions: {
            urls: [
                {
                    url: `http://auth-service/api/auth/docs-json`,
                    name: 'AUTH-MICROSERVICE',
                },
                {
                    url: `http://users-service/api/users/docs-json`,
                    name: 'USERS-MICROSERVICE',
                },
            ],
        },
    });

    await app.listen(3000);
}
bootstrap();
