import { UserModel } from "../../../models";
import User from "../models/User";

interface UserMutation {
  createUser(firstName: string, lastName: string, email: string, username: string, password: string): Promise<User>;
}

export default class RealUserMutation implements UserMutation {
  public async createUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ): Promise<User> {
    return await UserModel.create({ firstName, lastName, email, username, password });
  }
}
