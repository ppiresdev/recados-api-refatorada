import { Note } from "../../../models/note";
import { NoteRepository } from "../repositories/note.repository";

interface RequestData {
  noteId: string;
  content: string;
  status: boolean;
}

export default class UpdateNote {
  async execute({ noteId, content, status }: RequestData): Promise<any> {
    const noteRepository = new NoteRepository();

    const note = await noteRepository.getNoteById(noteId);

    if (content) note.content = content;
    if (status || status === false) note.status = status;

    await noteRepository.updateNote(note);

    return note;
  }
}
