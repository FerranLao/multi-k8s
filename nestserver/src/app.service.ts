import { Injectable } from '@nestjs/common';
import { Transport, Client, ClientProxy } from '@nestjs/microservices'

@Injectable()
export class AppService {

  @Client({
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_URL || 'nats://localhost:4222',
      user: process.env.NATS_USER || 'default',
      pass: process.env.NATS_PASS || 'default'
    },
  })
  client: ClientProxy;

  async getHello(): Promise<string> {
    await this.client.connect()
    const response = await this.client.send('prueba', 'Hello World').toPromise()
    return response
  }

  getPrueba(payload: any): any {
    return payload
  }

}