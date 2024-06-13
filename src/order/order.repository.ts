import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Order } from './order.schema';
import { createOrderDto } from './order.dto';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(order: createOrderDto): Promise<Order> {
    return await this.orderModel.create(order);
  }

  async delete(orderId: string): Promise<Order> {
    return await this.orderModel.findByIdAndDelete(orderId);
  }

  async findOrder(orderId: string): Promise<Order> {
    return await this.orderModel
      .findById(orderId)
      .populate('userId')
      .populate('productId');
  }

  async updateOrder(
    orderId: string,
    order: Partial<Omit<Order, '_id'>>,
  ): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(orderId, order);
  }
  async find(): Promise<Order[]> {
    return this.orderModel.find().populate('userId').populate('productId');
  }
}
