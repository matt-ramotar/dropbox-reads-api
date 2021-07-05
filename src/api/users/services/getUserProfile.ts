import { UserModel } from "../../../models";
import { UserProfile } from "../models/UserProfile";

export default async function getUserProfile(username: string): Promise<UserProfile | null> {
  const user = await UserModel.findOne({ username });
  return user?.toUserProfile() ?? null;
}
