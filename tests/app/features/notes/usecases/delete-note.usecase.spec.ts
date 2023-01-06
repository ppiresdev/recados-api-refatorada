import { NoteRepository } from "../../../../../src/app/features/notes/repositories/note.repository";
import DeleteNote from "../../../../../src/app/features/notes/usecases/delete-note.usecase";

describe("Remove Note usecase", () => {
  test("Deve chamar o método remove do repository ", async () => {
    const repository = new NoteRepository();
    const sut = new DeleteNote(repository);

    const spyRemoveGrowdev = jest
      .spyOn(repository, "removeNote")
      .mockResolvedValue();

    await sut.execute({ noteId: "any_id" });

    expect(spyRemoveGrowdev).toHaveBeenCalledTimes(1);
    expect(spyRemoveGrowdev).toHaveBeenCalledWith("any_id");
  });
});
