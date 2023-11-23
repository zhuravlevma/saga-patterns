import { NestFactory } from '@nestjs/core';
import { AccountingModule } from './accounting.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  await NestFactory.createMicroservice<MicroserviceOptions>(AccountingModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
}
bootstrap();
