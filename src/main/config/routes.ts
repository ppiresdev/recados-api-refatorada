import { Express } from "express";
import notesRoutes from "../../app/features/notes/notes.routes";
import usersRoutes from "../../app/features/users/users.routes";

export default (app: Express) => {
  app.get("/", (request, response) => response.send("ESTÁ FUNCIONANDO"));

  app.use(usersRoutes());
  app.use(notesRoutes());
};
