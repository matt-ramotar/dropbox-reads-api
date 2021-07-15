import { CommentModel } from "../../../models";
import { CreateCommentInput } from "../entities/CreateCommentInput";
import Comment from "../models/Comment";

export default async function createComment(input: CreateCommentInput): Promise<Comment> {
  try {
    const { userId, reviewId, parentCommentId, body } = input;

    const comment = await CommentModel.create({
      userId,
      reviewId,
      parentCommentId,
      body
    });

    return await comment.toPojo();
  } catch (error) {
    throw error;
  }
}
