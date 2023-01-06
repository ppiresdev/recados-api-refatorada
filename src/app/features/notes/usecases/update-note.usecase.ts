import { Note } from "../../../models/note";
import { redisHelper } from "../../../shared/database/redis-helper";
import { NoteRepository } from "../repositories/note.repository";

interface RequestData {
  noteId: string;
  content: string;
  status: boolean;
}

export default class UpdateNote {
  constructor(private _noteRepository: NoteRepository) {}

  async execute({ noteId, content, status }: RequestData): Promise<any> {
    const note = await this._noteRepository.getNoteById(noteId);

    console.log("==Note===", note);

    if (content) note.content = content;
    if (status || status === false) note.status = status;

    // await redisHelper.client.del("redixNotesCacheKey");
    await this._noteRepository.updateNote(note);

    return note;
  }
}
