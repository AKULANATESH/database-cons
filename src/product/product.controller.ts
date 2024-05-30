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
import { productDto, updateDto } from './product.dto';
import { Product } from './product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addproduct(@Body() createProduct: productDto): Promise<Product> {
    return await this.productService.addProduct(createProduct);
  }

  @Get('/:productType')
  async getproducts(
    @Param('productType') productType: string,
  ): Promise<Product[]> {
    return await this.productService.getProducts(productType);
  }

  @Get('get/:productName')
  async searchproducts(
    @Param('productName') productName: string,
  ): Promise<Product[]> {
    return await this.productService.getByName(productName);
  }

  @Put('/:productName')
  async updateproduct(
    @Body() productData: updateDto,
    @Param('productName') productName: string,
  ): Promise<string | Product> {
    const updatedproduct = await this.productService.updateProductByName(
      productName,
      productData,
    );
    return updatedproduct;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<string> {
    return await this.productService.deleteUser(userId);
  }
}
