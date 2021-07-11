import { DocumentType } from "@typegoose/typegoose";
import { CommentModel } from "../../../models";
import { CreateCommentInput } from "../entities/CreateCommentInput";
import Comment from "../models/Comment";

export default async function createComment(input: CreateCommentInput): Promise<DocumentType<Comment>> {
  try {
    const { userId, reviewId, parentCommentId, body } = input;

    return await CommentModel.create({
      userId,
      reviewId,
      parentCommentId,
      body
    });
  } catch (error) {
    throw error;
  }
}
