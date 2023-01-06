import { Note } from "../../../models/note";
import { redisHelper } from "../../../shared/database/redis-helper";
import { NoteRepository } from "../repositories/note.repository";

interface RequestData {
  userId: string;
  content: string | undefined;
  status: string | undefined;
}

export default class FindNotes {
  constructor(private _noteRepository: NoteRepository) {}

  async execute({ userId, content, status }: RequestData): Promise<Note[]> {
    let notes: Note[] = [];
    // let redixNotesCacheKey = await redisHelper.client.get("redixNotesCacheKey");
    // let redixNotesKey = userId + content + status;

    // if (redixNotesCacheKey) {
    //   if (redixNotesCacheKey !== redixNotesKey) {
    //     await redisHelper.client.del(redixNotesCacheKey);
    //     redixNotesCacheKey = redixNotesKey;
    //     await redisHelper.client.del("redixNotesCacheKey");
    //     await redisHelper.client.set("redixNotesCacheKey", redixNotesCacheKey);
    //     notes = await this._noteRepository.getNotesByUser(
    //       userId,
    //       content,
    //       status
    //     );
    //     await redisHelper.client.set(redixNotesCacheKey, JSON.stringify(notes));
    //   } else {
    //     const notesChace = await redisHelper.client.get(redixNotesCacheKey);

    //     const teste = JSON.parse(notesChace!);
    //     notes = teste.map((t: any) =>
    //       Note.create(t._id, t._content, t._status)
    //     );
    //   }
    // } else {
    //   notes = await this._noteRepository.getNotesByUser(
    //     userId,
    //     content,
    //     status
    //   );
    //   redixNotesCacheKey = redixNotesKey;
    //   await redisHelper.client.set("redixNotesCacheKey", redixNotesCacheKey);
    //   await redisHelper.client.set(redixNotesCacheKey, JSON.stringify(notes));
    // }
    notes = await this._noteRepository.getNotesByUser(userId, content, status);
    console.log("+++Notes+++", notes);

    return notes;
  }
}
