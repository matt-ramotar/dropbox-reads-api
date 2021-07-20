import { CommentModel } from "../../../models";
import { CreateCommentInput } from "../entities/CreateCommentInput";
import { GodComment } from "../models/GodComment";

export default async function createComment(input: CreateCommentInput): Promise<GodComment> {
  try {
    const { userId, reviewId, parentCommentId, body } = input;

    const comment = await CommentModel.create({
      userId,
      reviewId,
      parentCommentId,
      body
    });

    return await comment.toGodComment();
  } catch (error) {
    throw error;
  }
}
