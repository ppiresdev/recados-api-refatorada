import { Note } from "../../../models/note";
import { redisHelper } from "../../../shared/database/redis-helper";
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

    await redisHelper.client.del("redixNotesCacheKey");
    await noteRepository.updateNote(note);

    return note;
  }
}
