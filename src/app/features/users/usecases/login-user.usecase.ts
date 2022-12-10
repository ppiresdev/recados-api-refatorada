import { User } from "../../../models/user";
import { UserRepository } from "../repositories/user.repository";

interface RequestData {
  email: string;
  password: string;
}

export default class LoginUser {
  async execute({ email, password }: RequestData): Promise<any> {
    // verificar se o usuário já existe
    const userRepository = new UserRepository();

    const userFound = await userRepository.findUserByEmailAndPassword(
      email,
      password
    );

    if (!userFound) {
      throw new Error("Usuário Inexistente");
    }

    return userFound.id;
  }
}
