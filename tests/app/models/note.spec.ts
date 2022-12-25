import { Note } from "../../../src/app/models/note";

describe("Note model", () => {
  test("Deve instanciar conforme informações passadas no construtor", () => {
    const sut = new Note("any_content");

    expect(sut.id).toBeTruthy();
    expect(sut.content).toBe("any_content");
    expect(sut.status).toBe(true);
  });

  test("Deve fazer update do conteudo e status da note", () => {
    const sut = new Note("any_content");
    sut.update("any_content", false);

    expect(sut.content).toBe("any_content");
    expect(sut.status).toBeFalsy();
  });

  test("Deve fazer update do status da note", () => {
    const sut = new Note("any_content");
    sut.updateStatus(false);

    expect(sut.status).toBeFalsy();
  });

  test("Deve fazer update do content da note", () => {
    const sut = new Note("any_content");
    sut.updateContent("another_content");

    expect(sut.content).toBe("another_content");
  });

  test("Deve instanciar através do método estático create com as informações obrigatórias", () => {
    const sut = Note.create("any_id", "any_content", true);

    expect(sut.id).toBe("any_id");
    expect(sut.content).toBe("any_content");
    expect(sut.status).toBe(true);
  });

  test("Deve retornar objeto em formato JSON", () => {
    const sut = new Note("any_content");
    const noteJson = sut.toJson();
    expect(sut.toJson()).toEqual({
      id: sut.id,
      content: noteJson.content,
      status: sut.status,
    });
  });
});
