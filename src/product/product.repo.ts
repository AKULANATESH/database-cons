import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { productDto } from './product.dto';
import { Product } from './product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(product: productDto): Promise<Product> {
    const newProduct = await this.productModel.create(product);
    return newProduct;
  }

  async findBytype(productType: string): Promise<Product[]> {
    return await this.productModel.find({ productType });
  }

  async findByname(productName: string): Promise<Product[]> {
    return await this.productModel.find({ productName });
  }

  async updateProductByName(
    productName: string,
    updateData: Partial<Product>,
  ): Promise<Product | null> {
    return this.productModel
      .findOneAndUpdate({ productName }, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<string> {
    await this.productModel.findByIdAndDelete(id);
    return `User with ID ${id} deleted`;
  }
}
