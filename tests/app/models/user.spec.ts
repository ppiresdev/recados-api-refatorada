import { User } from "../../../src/app/models/user";

describe("User model", () => {
  test("Deve instanciar conforme as informacoes passadas no construtor", () => {
    const sut = new User("any_email", "any_password");

    expect(sut.id).toBeTruthy();
    expect(sut.email).toBe("any_email");
    expect(sut.password).toBe("any_password");
  });

  test("Deve instanciar através do método estático create com as informações obrigatórias", () => {
    const sut = User.create("any_id", "any_email", "any_password");

    expect(sut.id).toBe("any_id");
    expect(sut.email).toBe("any_email");
    expect(sut.password).toBe("any_password");
  });

  test("Deve retornar objeto em formato JSON", () => {
    const sut = new User("any_email", "any_password");
    const userJson = sut.toJson();
    expect(sut.toJson()).toEqual({ id: userJson.id, email: userJson.email });
  });

  test("Deve retornar notes", () => {
    const sut = new User("any_email", "any_password");
    expect(sut.notes).toBeUndefined();
  });
});
