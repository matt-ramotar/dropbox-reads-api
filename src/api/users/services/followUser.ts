import { UserModel } from "../../../models";
import { SafeUser } from "../models/SafeUser";

export default async function followUser(userId: string, otherUserId: string): Promise<SafeUser | null> {
  try {
    const user = await UserModel.findById(userId);
    const otherUser = await UserModel.findById(otherUserId);
    if (!user || !otherUser) throw new Error();

    if (user.usersFollowing) user.usersFollowing.push(otherUserId);
    else user.usersFollowing = [otherUserId];

    if (otherUser.usersFollowedBy) otherUser.usersFollowedBy.push(userId);
    else otherUser.usersFollowedBy = [userId];

    await user.save();
    await otherUser.save();

    return user.toSafeUser();
  } catch (error) {
    throw error;
  }
}
