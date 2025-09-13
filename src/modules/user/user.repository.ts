import { CreateUserDtoType } from "../dtos/user.dto";

const fakeDB: CreateUserDtoType[] = [
  { id: 1, name: "Sohidul" },
  { id: 2, name: "Ananto" },
];

export class UserRepository {
  public findAll() {
    return fakeDB;
  }

  public findById(id: number) {
    return fakeDB.find(user => user.id === id) || null;
  }

  public create(user: CreateUserDtoType) {
    fakeDB.push(user);
    return user;
  }
}
