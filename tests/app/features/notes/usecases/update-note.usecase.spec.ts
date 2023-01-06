import { NoteRepository } from "../../../../../src/app/features/notes/repositories/note.repository";
import UpdateNote from "../../../../../src/app/features/notes/usecases/update-note.usecase";

describe("Update Note UseCase", () => {
  test("Deve atualizar um recado", async () => {
    const repository = new NoteRepository();
    const sut = new UpdateNote(repository);

    jest.spyOn(repository, "getNoteById").mockResolvedValue({
      id: "any_note_id",
      content: "any_content",
      status: true,
      userId: "any_user_id",
    });
    jest.spyOn(repository, "updateNote").mockResolvedValue();

    const result = await sut.execute({
      noteId: "any_note_id",
      content: "new_any_content",
      status: false,
    });

    expect(result).toEqual({
      id: "any_note_id",
      content: "new_any_content",
      status: false,
      userId: "any_user_id",
    });
  });
});
