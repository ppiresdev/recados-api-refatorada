import { redisHelper } from "../../../shared/database/redis-helper";
import { NoteRepository } from "../repositories/note.repository";

interface RequestData {
  noteId: string;
}

export default class DeleteNote {
  async execute({ noteId }: RequestData): Promise<any> {
    const noteRepository = new NoteRepository();
    await redisHelper.client.del("redixNotesCacheKey");
    await noteRepository.removeNote(noteId);
  }
}
