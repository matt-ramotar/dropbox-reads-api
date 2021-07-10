import { CommentReactionNotFound, UserNotFound } from "../../../errors";
import { CommentReactionModel, UserModel } from "../../../models";

export default async function addCommentReaction(userId: string, commentReactionId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const commentReaction = await CommentReactionModel.findById(commentReactionId);
    if (!commentReaction) throw new CommentReactionNotFound();

    if (user.commentReactions) user.commentReactions.push(commentReactionId);
    else user.commentReactions = [commentReactionId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
