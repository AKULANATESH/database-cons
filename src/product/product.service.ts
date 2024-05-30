import { Injectable, NotFoundException } from '@nestjs/common';
import { productDto } from './product.dto';
import { Product } from './product.schema';
import { ProductRepository } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async addProduct(newProduct: productDto): Promise<Product> {
    const addedProduct = await this.productRepository.create(newProduct);
    return addedProduct;
  }

  async getProducts(products: string): Promise<Product[]> {
    return await this.productRepository.findBytype(products);
  }

  async getByName(products: string): Promise<Product[]> {
    return await this.productRepository.findByname(products);
  }

  async updateProductByName(
    productName: string,
    updateData: Partial<Product>,
  ): Promise<Product | string> {
    const result = await this.productRepository.updateProductByName(
      productName,
      updateData,
    );
    if (!result) {
      throw new NotFoundException(`Product with name ${productName} not found`);
    }
    return result;
  }

  async deleteUser(userId: string): Promise<string> {
    const result = await this.productRepository.delete(userId);
    if (!result) {
      throw new NotFoundException('product with id not found');
    }
    return 'product deleted successfully!';
  }
}
