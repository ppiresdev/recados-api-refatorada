import { Note } from "../../../models/note";
import { NoteRepository } from "../repositories/note.repository";

interface RequestData {
  userId: string;
  content: string | undefined;
  status: string | undefined;
}

export default class FindNotes {
  async execute({ userId, content, status }: RequestData): Promise<Note[]> {
    const noteRepository = new NoteRepository();

    const notes = await noteRepository.getNotesByUser(userId, content, status);

    return notes;
  }
}
