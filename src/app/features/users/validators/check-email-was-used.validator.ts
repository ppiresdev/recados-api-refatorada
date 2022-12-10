import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";

export class CheckEmailWasUsedValidator {
  async validate(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    const repository = new UserRepository();
    const userExists = await repository.verifyUserExistsByEmail(email);

    if (userExists) {
      return response.status(400).json("E-mail já está em uso");
    }
    return next();
  }
}
