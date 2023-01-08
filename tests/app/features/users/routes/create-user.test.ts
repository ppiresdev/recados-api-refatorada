import { pgHelper } from "../../../../../src/app/shared/database/pg-helper";
import { UserEntity } from "../../../../../src/app/shared/database/entities/user.entity";
import supertest from "supertest";
import app from "../../../../../src/main/config/app";
import crypto from "crypto";

describe("POST - /user", () => {
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

  test("Deve retornar 400 quando se faltar e-mail ou senha", async () => {
    const response = await supertest(app)
      .post("/user")
      .send({ email: "", password: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "E-mail e senha são obrigaórios.",
    });
  });

  test("Deve retornar 400 quando o e-mail já existe", async () => {
    const userEntity = pgHelper.client.manager.create(UserEntity, {
      id: crypto.randomUUID(),
      email: "any_email@test.com",
      password: "any_password",
    });

    await pgHelper.client.manager.save(userEntity);

    const response = await supertest(app)
      .post("/user")
      .send({ email: "any_email@test.com", password: "any_password" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual("E-mail já está em uso");
  });

  test("Deve retornar 200 com o usuário criado", async () => {
    //  await redisHelper.client.set("growdevers", "['any_value']");

    const response = await supertest(app)
      .post("/user")
      .send({ email: "any_email@test.com", password: "any_password" });

    const userEntity = await pgHelper.client.manager.findOne(UserEntity, {
      where: { id: response.body.id },
    });

    // const cache = await redisHelper.client.get("growdevers");

    expect(response.status).toBe(200);
    expect(userEntity).toBeTruthy();
    expect(userEntity?.email).toBe("any_email@test.com");
    // expect(cache).toBeFalsy();
  });
});
