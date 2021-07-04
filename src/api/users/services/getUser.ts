import { UserModel } from "../../../models";
import { SafeUser } from "../models/SafeUser";

export default async function getUser(userId: string): Promise<SafeUser | null> {
  const user = await UserModel.findById(userId);
  return user?.toSafeUser() ?? null;
}
