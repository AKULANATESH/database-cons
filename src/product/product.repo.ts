import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { createProductDto } from './product.dto';
import { Product } from './product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(product: createProductDto): Promise<Product> {
    const newProduct = await this.productModel.create(product);
    return newProduct;
  }

  async findByType(productType: string): Promise<Product[]> {
    return await this.productModel.find({ productType });
  }

  async findByName(productName: string): Promise<Product[]> {
    return await this.productModel.find({ productName });
  }

  async updateProductByName(
    _id: string,
    updateData: Partial<Omit<Product, '_id'>>,
  ): Promise<Product | null> {
    return await this.productModel.findByIdAndUpdate({ _id }, updateData, {
      new: true,
    });
  }

  async delete(id: string): Promise<string> {
    await this.productModel.findByIdAndDelete(id);
    return `User with ID ${id} deleted`;
  }
}
