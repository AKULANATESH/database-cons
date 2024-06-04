import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto, createUpdateDto } from './product.dto';
import { Product } from './product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addproduct(@Body() createProduct: createProductDto): Promise<Product> {
    return await this.productService.addProduct(createProduct);
  }

  @Get('/:productType')
  async getproducts(
    @Param('productType') productType: string,
  ): Promise<Product[]> {
    return await this.productService.getProducts(productType);
  }

  @Get('get/:productName')
  async searchProducts(
    @Param('productName') productName: string,
  ): Promise<Product[]> {
    return await this.productService.getByName(productName);
  }

  @Put('/:id')
  async updateproduct(
    @Body() productData: createUpdateDto,
    @Param('id') productId: string,
  ): Promise<Product> {
    const updatedproduct = await this.productService.updateProductByName(
      productId,
      productData,
    );
    return updatedproduct;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') productId: string): Promise<string> {
    return await this.productService.deleteProduct(productId);
  }
}
