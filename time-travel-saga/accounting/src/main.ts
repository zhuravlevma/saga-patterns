import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AccountingModule } from './accounting.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountingModule);

  const config = new DocumentBuilder()
    .setTitle('App example')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3008);
}
bootstrap();
