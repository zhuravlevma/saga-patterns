import { NestFactory } from '@nestjs/core';
import { WarehouseModule } from './warehouse.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  await NestFactory.createMicroservice<MicroserviceOptions>(WarehouseModule, {
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
