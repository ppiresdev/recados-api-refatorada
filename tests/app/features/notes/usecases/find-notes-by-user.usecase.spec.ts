import { NoteRepository } from "../../../../../src/app/features/notes/repositories/note.repository";
import FindNotes from "../../../../../src/app/features/notes/usecases/find-notes-by-user.usecase";
import { Note } from "../../../../../src/app/models/note";

describe("Find Notes By User Usecase", () => {
  test("Deve retornar os recados de um usuário", async () => {
    const repository = new NoteRepository();
    const sut = new FindNotes(repository);

    jest
      .spyOn(repository, "getNotesByUser")
      .mockResolvedValue([new Note("any_content")]);

    const result = await sut.execute({
      userId: "any_user_id",
      content: "any_content",
      status: "true",
    });

    expect(result).toBeTruthy();
  });
});
