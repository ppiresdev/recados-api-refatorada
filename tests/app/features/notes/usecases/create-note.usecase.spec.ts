import { NoteRepository } from "../../../../../src/app/features/notes/repositories/note.repository";
import CreateNote from "../../../../../src/app/features/notes/usecases/create-note.usecase";

describe("Create Note UseCase", () => {
  test("Deve criar um recado", async () => {
    const repository = new NoteRepository();
    const sut = new CreateNote(repository);

    jest.spyOn(repository, "saveNote").mockResolvedValue();

    const result = await sut.execute({
      userId: "any_user_id",
      content: "any_content",
    });

    expect(result.content).toBe("any_content");
  });
});
