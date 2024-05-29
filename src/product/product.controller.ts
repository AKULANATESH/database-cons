import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { productdto } from './product.dto';
import { Product } from './product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addproduct(@Body() createProduct: productdto): Promise<Product> {
    return await this.productService.addProduct(createProduct);
  }

  @Get('/:product_type')
  async getproducts(
    @Param('product_type') searchProduct: string,
  ): Promise<Product[]> {
    return await this.productService.getProducts(searchProduct);
  }

  @Get('get/:product_name')
  async searchproducts(
    @Param('product_name') searchProductbyname: string,
  ): Promise<Product[]> {
    return await this.productService.getbyname(searchProductbyname);
  }
}
