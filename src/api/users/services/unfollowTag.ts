import { TagNotFound, UserNotFound } from "../../../errors";
import { TagModel, UserModel } from "../../../models";

export default async function unfollowTag(userId: string, tagId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const tagToUnfollow = await TagModel.findById(tagId);
    if (!tagToUnfollow) throw new TagNotFound();

    if (!user.tagsFollowing) throw new Error("User not following any tags");

    user.tagsFollowing = (user.tagsFollowing as string[]).filter((tagFollowingId: string) => tagFollowingId !== tagToUnfollow.id);
    await user.save();
  } catch (error) {
    throw error;
  }
}
