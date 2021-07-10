import { CommentReactionModel } from "../../../models";
import CommentReaction from "../models/CommentReaction";

export default async function createCommentReaction(commentId: string, userId: string, reactionId: string): Promise<CommentReaction> {
  try {
    return await CommentReactionModel.create({
      commentId,
      userId,
      reactionId
    });
  } catch (error) {
    throw error;
  }
}
