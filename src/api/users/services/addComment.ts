import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addComment(userId: string, commentId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw UserNotFound;

    if (user.commentIds) user.commentIds.push(commentId);
    else user.commentIds = [commentId];
    await user.save();
  } catch (error) {
    throw error;
  }
}
