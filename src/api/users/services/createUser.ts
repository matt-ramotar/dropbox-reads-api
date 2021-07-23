import { DocumentType } from "@typegoose/typegoose";
import { UserModel } from "../../../models";
import User from "../models/User";

export default async function createUser(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  googleId?: string,
  picture?: string
): Promise<DocumentType<User>> {
  try {
    return await UserModel.create({ firstName, lastName, username, email, googleId, picture });
  } catch (error) {
    throw error;
  }
}
