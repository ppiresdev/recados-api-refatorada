import { User } from "../../../models/user";
import { UserRepository } from "../repositories/user.repository";

interface RequestData {
  email: string;
  password: string;
}

export default class CreateUser {
  // private _userRepository: UserRepository;
  constructor(private _userRepository: UserRepository) {
    // this._userRepository = userRepository;
  }

  async execute({ email, password }: RequestData): Promise<any> {
    // verificar se o usuário já existe
    //const userRepository = new UserRepository();

    const userExists = await this._userRepository.verifyUserExistsByEmail(
      email
    );

    if (userExists) {
      throw new Error("Já existe um usuário com este e-email");
    }

    // encryptografar a senha
    //const encryptedPassword = await bcryp.hash(password, 8);

    // salvar no banco de dados
    const user = new User(email, password);

    await this._userRepository.createUser(user);

    return user.toJson();
  }
}
