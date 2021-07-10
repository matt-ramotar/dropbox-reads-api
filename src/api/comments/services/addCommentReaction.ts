import { CommentNotFound, CommentReactionNotFound } from "../../../errors";
import { CommentModel, CommentReactionModel } from "../../../models";

export default async function addCommentReaction(commentId: string, commentReactionId: string): Promise<void> {
  try {
    const comment = await CommentModel.findById(commentId);
    if (!comment) throw new CommentNotFound();

    const commentReaction = await CommentReactionModel.findById(commentReactionId);
    if (!commentReaction) throw new CommentReactionNotFound();

    if (comment.reactions) comment.reactions.push(commentReactionId);
    else comment.reactions = [commentReactionId];

    await comment.save();
  } catch (error) {
    throw error;
  }
}
