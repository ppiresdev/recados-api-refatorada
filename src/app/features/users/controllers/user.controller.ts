import { Request, Response } from "express";
import CreateUser from "../usecases/create-user.usecase";
import LoginUser from "../usecases/login-user.usecase";

export default class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const usecase = new CreateUser();

      const result = await usecase.execute(request.body);

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(500).json({ error: error.message, stack: error });
    }
  }

  async loginUser(request: Request, response: Response) {
    try {
      const usecase = new LoginUser();
      const result = await usecase.execute(request.body);

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(500).json({ error: error.message, stack: error });
    }
  }
}
