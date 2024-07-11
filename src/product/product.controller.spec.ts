import { createMock, type DeepMocked } from '@golevelup/ts-jest';
import { Test, type TestingModule } from '@nestjs/testing';
import { Product } from '@prisma/client';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';

describe('ProductController', () => {
    let productController: ProductController;
    let mockProductService: DeepMocked<ProductService>;

    const mockProduct = {
productName:"pen",
productPrice:20,
productDescription:"topper",
productType:"DOMESTICNEEDS"
};

beforeEach(async () => {
    mockProductService = createMock<ProductService>();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide:  ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });