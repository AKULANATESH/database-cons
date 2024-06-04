import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Order } from './order.schema';
import { createOrderDto } from './order.dto';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModule: Model<Order>) {}

  async create(order: createOrderDto): Promise<Order> {
    return await this.orderModule.create(order);
  }

  async delete(orderId: string): Promise<Order> {
    return await this.orderModule.findByIdAndDelete(orderId);
  }

  async findOrder(orderId: string): Promise<Order> {
    return await this.orderModule.findById(orderId);
  }

  async updateOrder(
    orderId: string,
    order: Partial<Omit<Order, '_id'>>,
  ): Promise<Order> {
    return await this.orderModule.findByIdAndUpdate(orderId, order);
  }
  async getAllOrders(order: createOrderDto): Promise<Order[]> {
    return await this.orderModule.find({ order });
  }
}
