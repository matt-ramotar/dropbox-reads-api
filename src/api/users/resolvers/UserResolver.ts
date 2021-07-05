import { Arg, Query, Resolver } from "type-graphql";
import { UserModel } from "../../../models";
import User from "../models/User";

@Resolver((_of) => User)
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }
}
