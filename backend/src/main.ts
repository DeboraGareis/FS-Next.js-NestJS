import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración del Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Ecommerce')
    .setDescription('Documentación de la API del proyecto')
    .setVersion('1.0')
    .addBearerAuth() // si usás JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // URL: http://localhost:3000/api-docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();