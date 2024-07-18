import {
  UserFilterQuery,
  UserRepository,
} from "src/repositories/user.repository";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getAllUsers(query: UserFilterQuery) {
    return await this.userRepo.index(query);
  }
}
