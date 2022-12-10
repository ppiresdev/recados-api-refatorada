import { NoteRepository } from "../repositories/note.repository";

interface RequestData {
  noteId: string;
}

export default class DeleteNote {
  async execute({ noteId }: RequestData): Promise<any> {
    const noteRepository = new NoteRepository();

    await noteRepository.removeNote(noteId);
  }
}
