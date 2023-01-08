import { pgHelper } from "../../../../../src/app/shared/database/pg-helper";
import { UserEntity } from "../../../../../src/app/shared/database/entities/user.entity";
import supertest from "supertest";
import app from "../../../../../src/main/config/app";
import crypto from "crypto";

describe("POST - /users/login", () => {
  beforeAll(async () => {
    await pgHelper.connect();
    // redisHelper.connect();
  });

  afterAll(async () => {
    await pgHelper.disconnect();
    // redisHelper.disconnect();
  });

  afterEach(async () => {
    await pgHelper.client.manager.delete(UserEntity, {});
  });

  test("Deve retornar 200 quando usuário conseguir fazer login", async () => {
    const userEntity = pgHelper.client.manager.create(UserEntity, {
      id: crypto.randomUUID(),
      email: "any_email@test.com",
      password: "any_password",
    });

    await pgHelper.client.manager.save(userEntity);

    const response = await supertest(app)
      .post("/users/login")
      .send({ email: "any_email@test.com", password: "any_password" });

    expect(response.status).toBe(200);
  });
  test("Deve retornar 500 quando usuário não conseguir fazer login", async () => {
    const userEntity = pgHelper.client.manager.create(UserEntity, {
      id: crypto.randomUUID(),
      email: "any_email@test.com",
      password: "any_password",
    });

    await pgHelper.client.manager.save(userEntity);

    const response = await supertest(app)
      .post("/users/login")
      .send({ email: "email@test.com", password: "any_password" });

    expect(response.status).toBe(500);
  });
});
