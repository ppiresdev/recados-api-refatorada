import { User } from "../../../models/user";
import { UserEntity } from "../../../shared/database/entities/user.entity";
import { pgHelper } from "../../../shared/database/pg-helper";

export class UserRepository {
  async findUsers(): Promise<User[]> {
    const manager = pgHelper.client.manager;
    const usersEntities = await manager.find(UserEntity);

    return usersEntities.map((row) => {
      return User.create(row.id, row.email, row.password);
    });
  }

  async verifyUserExistsByEmail(email: string): Promise<boolean> {
    const manager = pgHelper.client.manager;
    const userEntity = await manager.findOneBy(UserEntity, { email });

    return !!userEntity;
  }

  async createUser(user: User): Promise<void> {
    const manager = pgHelper.client.manager;

    const userEntity = manager.create(UserEntity, {
      id: user.id,
      email: user.email,
      password: user.password,
    });

    await manager.save(userEntity);
  }

  async findUserByEmailAndPassword(email: string, password: string) {
    const manager = pgHelper.client.manager;

    const userEntity = await manager.findOne(UserEntity, {
      where: { email, password },
    });

    if (!userEntity) return undefined;

    return userEntity;
  }
}
