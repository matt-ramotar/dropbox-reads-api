import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addComment(userId: string, commentId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw UserNotFound;

    if (user.comments) user.comments.push(commentId);
    else user.comments = [commentId];
    await user.save();
  } catch (error) {
    throw error;
  }
}
