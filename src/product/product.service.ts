import { Injectable, NotFoundException } from '@nestjs/common';
import { createProductDto } from './product.dto';
import { Product } from './product.schema';
import { ProductRepository } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async addProduct(newProduct: createProductDto): Promise<Product> {
    const addedProduct = await this.productRepository.create(newProduct);
    return addedProduct;
  }

  async getProducts(productType: string): Promise<Product[]> {
    return await this.productRepository.findByType(productType);
  }

  async getByName(productName: string): Promise<Product[]> {
    return await this.productRepository.findByName(productName);
  }

  async updateProductByName(
    productId: string,
    updateData: Partial<Product>,
  ): Promise<Product> {
    const result = await this.productRepository.updateProductByName(
      productId,
      updateData,
    );
    if (!result) {
      throw new NotFoundException(`Product with name ${productId} not found`);
    }
    return result;
  }

  async deleteUser(productId: string): Promise<string> {
    const result = await this.productRepository.delete(productId);
    if (!result) {
      throw new NotFoundException('product with id not found');
    }
    return 'product deleted successfully!';
  }
}
