import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.NATS,
    options:{
      url: process.env.NATS_URL || 'nats://localhost:4222',
      user: process.env.NATS_USER || 'default',
      pass: process.env.NATS_PASS || 'default'
    }
  })
  await app.listen(3001);
  await microservice.listen(()=>console.log("microservice listening"))
}
bootstrap();
