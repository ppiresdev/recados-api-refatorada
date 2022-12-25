import { User } from "../../../models/user";
import { UserRepository } from "../repositories/user.repository";

interface RequestData {
  email: string;
  password: string;
}

export default class LoginUser {
  constructor(private _userRepository: UserRepository) {}

  async execute({ email, password }: RequestData): Promise<any> {
    // verificar se o usuário já existe
    // const userRepository = new UserRepository();

    const userFound = await this._userRepository.findUserByEmailAndPassword(
      email,
      password
    );

    console.log("==User Entity==", userFound);

    if (!userFound) {
      throw new Error("Usuário Inexistente");
    }

    return userFound.id;
  }
}
