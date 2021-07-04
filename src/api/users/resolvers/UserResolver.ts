import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserModel } from "../../../models";
import User from "../models/User";
import RealUserMutation from "../mutations/UserMutation";

@Resolver((_of) => User)
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<User> {
    return new RealUserMutation().createUser(firstName, lastName, email, username, password);
  }
}
