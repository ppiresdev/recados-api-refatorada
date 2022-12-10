import { Router } from "express";
import NoteController from "./controllers/note.controller";
import { CreateNoteDataValidator } from "./validators/create-note-data.validator";

export default () => {
  const router = Router();

  const noteController = new NoteController();

  router.get("/user/:userId/notes", noteController.findNotesByUser);
  router.post(
    "/user/:userId/notes",
    new CreateNoteDataValidator().validate,
    noteController.createNote
  );
  router.put("/note/:noteId", noteController.updateNote);
  router.delete("/note/:noteId", noteController.deleteNote);

  return router;
};
