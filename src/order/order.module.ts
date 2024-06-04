import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { OrderRepository } from './order.reo';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './order.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
