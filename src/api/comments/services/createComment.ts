import { CommentModel } from "../../../models";
import { CreateCommentInput } from "../entities/CreateCommentInput";
import Comment from "../models/Comment";

export default async function createComment(input: CreateCommentInput): Promise<Comment> {
  const { userId, reviewId, parentId, body } = input;

  return await CommentModel.create({
    user: userId,
    review: reviewId,
    parentComment: parentId,
    body
  });
}
