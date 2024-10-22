import { Repository, UserDTO, UserEntity } from "../types";
import { UserError } from "../errors";

class UserRepository implements Repository<UserEntity, UserDTO> {
  private readonly _db: Map<string, UserEntity>;

  constructor() {
    this._db = new Map<string, UserEntity>();
  }

  create(entity: UserEntity): UserEntity {
    const user = this._db.get(entity.id);

    if (user)
      throw new UserError({
        name: "MALFORMED_INPUT",
        message: `user with ${entity.id} exists`,
      });

    this._db.set(entity.id, entity);
    return entity;
  }

  findOne(id: string): UserEntity {
    const user = this._db.get(id);

    if (!user)
      throw new UserError({
        name: "NOT_FOUND",
        message: `user with ${id} was not found`,
      });

    return user;
  }

  findAll(): UserEntity[] {
    return Array.from(this._db.values());
  }

  updateOne(id: string, dto: UserDTO): UserEntity {
    const user = this._db.get(id);

    if (!user)
      throw new UserError({
        name: "NOT_FOUND",
        message: `user with ${id} was not found`,
      });

    //TODO: missing DTO validation

    if (dto.age) {
      user.age = dto.age;
    }
    if (dto.username) {
      user.username = dto.username;
    }
    if (Array.isArray(dto.hobbies)) {
      user.hobbies = dto.hobbies;
    }

    return user;
  }

  deleteOne(id: string): boolean {
    const user = this._db.get(id);

    if (!user)
      throw new UserError({
        name: "NOT_FOUND",
        message: `user with ${id} was not found`,
      });

    return this._db.delete(id);
  }
}

export default UserRepository;
