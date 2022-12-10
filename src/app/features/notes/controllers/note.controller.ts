import { Request, Response } from "express";
import CreateNote from "../usecases/create-note.usecase";
import DeleteNote from "../usecases/delete-note.usecase";
import FindNotes from "../usecases/find-notes-by-user.usecase";
import UpdateNote from "../usecases/update-note.usecase";

interface RequestData {
  content: string | undefined;
  status: string | undefined;
}

export default class NoteController {
  async findNotesByUser(request: Request, response: Response) {
    try {
      const { userId } = request.params;
      const content = request.query.content as string | undefined;
      const status = request.query.status as string | undefined;

      const usecase = new FindNotes();

      const result = await usecase.execute({ userId, content, status });

      return response.status(200).json(result.map((a) => a.toJson()));
    } catch (error) {
      return response.status(400).json("Credenciais inválidas");
    }
  }

  async createNote(request: Request, response: Response) {
    try {
      const { userId } = request.params;
      const { content } = request.body;

      const usecase = new CreateNote();

      const result = await usecase.execute({ userId, content });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(500).json({ error: error.message, stack: error });
    }
  }

  async updateNote(request: Request, response: Response) {
    try {
      const { noteId } = request.params;
      const { content, status } = request.body;

      const usecase = new UpdateNote();

      const result = await usecase.execute({ noteId, content, status });

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json("Ocorreu um erro");
    }
  }

  async deleteNote(request: Request, response: Response) {
    try {
      const { noteId } = request.params;

      const usecase = new DeleteNote();
      await usecase.execute({ noteId });

      return response.status(200).json("Exclusão concluída");
    } catch (error) {
      return response.status(500).json("Exclusão não concluída");
    }
  }
}
