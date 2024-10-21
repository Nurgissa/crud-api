import { Repository, UserDTO, UserEntity } from "../types";
import UserRepository from "../repositories/repository";
import { v4 as uuid4, validate } from "uuid";
import makeUser from "../entities";
import { UserError } from "../errors";

class UserService {
  private readonly _repository: Repository<UserEntity, UserDTO>;

  constructor(repository: Repository<UserEntity, UserDTO>) {
    this._repository = repository;
  }

  public create(dto: UserDTO) {
    const user = makeUser({
      id: uuid4(),
      username: dto.username,
      age: dto.age,
      hobbies: dto.hobbies,
    });

    return this._repository.create(user);
  }

  public getById(id: string) {
    if (!validate(id)) {
      throw new UserError({
        name: "MALFORMED_INPUT",
        message: "userId is not uuid",
      });
    }

    return this._repository.findOne(id);
  }

  public getAll() {
    return this._repository.findAll();
  }

  public update(id: string, dto: UserDTO) {
    if (!validate(id)) {
      throw new UserError({
        name: "MALFORMED_INPUT",
        message: "userId is not uuid",
      });
    }

    return this._repository.updateOne(id, dto);
  }

  public deleteById(id: string) {
    if (!validate(id)) {
      throw new UserError({
        name: "MALFORMED_INPUT",
        message: "userId is not uuid",
      });
    }

    return this._repository.deleteOne(id);
  }
}

export default UserService;
