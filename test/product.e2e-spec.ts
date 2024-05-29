import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProductModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /product', async () => {
    const addProduct = {
      product_name: `${new Date().toISOString()}.nikweesd`,
      product_price: 15000,
      product_description: 'more style more fashion',
      product_type: 'shoes',
    };
    const response = await request(app.getHttpServer())
      .post('/product')
      .send(addProduct)
      .expect(201);

    expect(response.body).toMatchObject({
      product_name: addProduct.product_name,
      product_price: addProduct.product_price,
      product_description: addProduct.product_description,
      product_type: addProduct.product_type,
      _id: expect.any(String),
    });
  });

  // it('POST /product', async () => {
  //   const addproduct = {
  //     product_name: 345.776,
  //     product_price: 2300,
  //     product_description: 'more style more fashion',
  //     product_type: 'shoes',
  //   };
  //   const response = await request(app.getHttpServer())
  //     .post('/product')
  //     .send(addproduct)
  //     .expect(400);
  // });

  it('GET /product/:product_type', async () => {
    const createProduct = {
      product_name: `${new Date().toISOString()}.rebook`,
      product_price: 3500,
      product_description: 'underrated footwear',
      product_type: 'shoes',
    };

    const createProductResponse = await request(app.getHttpServer())
      .post('/product')
      .send(createProduct)
      .expect(201);

    const producttype = createProductResponse.body.product_type;
    const productid = createProductResponse.body._id;

    const response = await request(app.getHttpServer())
      .get(`/product/${producttype}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: productid,
          product_name: createProduct.product_name,
          product_price: createProduct.product_price,
          product_description: createProduct.product_description,
          product_type: createProduct.product_type,
        }),
      ]),
    );
  });