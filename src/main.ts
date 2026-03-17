import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Payment Webhook Service')
    .setDescription(
      'Production-ready Paystack webhook with idempotency & reconciliation',
    )
    .setVersion('1.0')
    .addTag('webhook')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Server running on http://localhost:3000`);
  console.log(`Swagger docs: http://localhost:3000/api`);
}
void bootstrap();
