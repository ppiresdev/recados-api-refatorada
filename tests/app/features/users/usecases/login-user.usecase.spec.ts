import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import LoginUser from "../../../../../src/app/features/users/usecases/login-user.usecase";

describe("Login User usecase", () => {
  test("Deve lançar erro se o e-mail ou senha estiverem incorretos", async () => {
    const repository = new UserRepository();
    const sut = new LoginUser(repository);

    jest
      .spyOn(repository, "findUserByEmailAndPassword")
      .mockResolvedValue(undefined);

    const promise = sut.execute({
      email: "any_email",
      password: "any_password",
    });

    await expect(promise).rejects.toThrow("Usuário Inexistente");
  });

  test("Deve retornar uid se o e-mail e senha forem corretos", async () => {
    const repository = new UserRepository();
    const sut = new LoginUser(repository);

    jest.spyOn(repository, "findUserByEmailAndPassword").mockResolvedValue({
      id: "any_id",
      email: "any_email",
      password: "any_password",
    });

    const result = await sut.execute({
      email: "any_email",
      password: "any_password",
    });

    expect(result).toBe("any_id");
  });
});
