import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserModule (e2e)', () => {
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

  it('POST /users', async () => {
    const createUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUser)
      .expect(201);

    expect(response.body).toMatchObject({
      _id: expect.any(String),
      name: createUser.name,
      email: createUser.email,
      age: createUser.age,
    });
  });

  it('GET /users/:id', async () => {
    const createUser = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      age: 25,
    };

    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send(createUser)
      .expect(201);

    const userId = createUserResponse.body._id;

    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body).toMatchObject({
      _id: userId,
      name: createUser.name,
      email: createUser.email,
      age: createUser.age,
    });
  });

  it('PUT /users/:id', async () => {
    const createUser = {
      name: 'Alice Doe',
      email: 'alice.doe@example.com',
      age: 28,
    };

    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send(createUser)
      .expect(201);

    const userId = createUserResponse.body._id;

    const updateUser = {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      age: 29,
    };

    const response = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .send(updateUser)
      .expect(200);

    expect(response.body).toMatchObject({
      _id: userId,
      name: updateUser.name,
      email: updateUser.email,
      age: updateUser.age,
    });
  });

  it('DELETE /users/:id', async () => {
    const createUser = {
      name: 'Bob Doe',
      email: 'bob.doe@example.com',
      age: 35,
    };

    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send(createUser)
      .expect(201);

    const userId = createUserResponse.body._id;

    await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);

    await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
  });
});
