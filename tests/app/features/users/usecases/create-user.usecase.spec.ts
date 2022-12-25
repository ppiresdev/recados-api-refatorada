import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import CreateUser from "../../../../../src/app/features/users/usecases/create-user.usecase";

describe("Create User Usecase", () => {
  test("Deve lançar erro se o usuário já existir", async () => {
    const repository = new UserRepository();
    const sut = new CreateUser(repository);

    jest.spyOn(repository, "verifyUserExistsByEmail").mockResolvedValue(true);
    const spyCreateUser = jest
      .spyOn(repository, "createUser")
      .mockResolvedValue();

    const promise = sut.execute({
      email: "any_email",
      password: "any_password",
    });

    await expect(promise).rejects.toThrow(
      "Já existe um usuário com este e-email"
    );
    expect(spyCreateUser).not.toHaveBeenCalled();
  });

  test("Deve criar usuário se ele não existir", async () => {
    const repository = new UserRepository();
    const sut = new CreateUser(repository);

    jest.spyOn(repository, "verifyUserExistsByEmail").mockResolvedValue(false);
    jest.spyOn(repository, "createUser").mockResolvedValue();

    const result = await sut.execute({
      email: "any_email",
      password: "any_password",
    });

    expect(result.id).toBeTruthy();
    expect(result.email).toBe("any_email");
  });
});
