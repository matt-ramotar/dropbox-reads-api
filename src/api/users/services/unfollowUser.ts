import { UserModel } from "../../../models";
import { SafeUser } from "../models/SafeUser";
import User from "../models/User";

export default async function unfollowOtherUser(userId: string, otherUserId: string): Promise<SafeUser | null> {
  try {
    const user = await UserModel.findById(userId);
    const otherUser = await UserModel.findById(otherUserId);
    if (!user || !otherUser) throw new Error();

    if (!user.usersFollowing) throw new Error();
    if (!otherUser.usersFollowedBy) throw new Error();

    user.usersFollowing = (user.usersFollowing as User[]).filter((otherUser: User) => otherUser.id !== otherUserId);
    otherUser.usersFollowedBy = (user.usersFollowedBy as User[]).filter((user: User) => user.id !== userId);

    await user.save();
    await otherUser.save();

    return user.toSafeUser();
  } catch (error) {
    throw error;
  }
}
