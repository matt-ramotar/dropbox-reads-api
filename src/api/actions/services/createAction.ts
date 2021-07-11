import { DocumentType } from "@typegoose/typegoose";
import { ActionModel } from "../../../models";
import { CreateActionInput } from "../entities/CreateActionInput";
import Action from "../models/Action";

export default async function createAction(input: CreateActionInput): Promise<DocumentType<Action>> {
  try {
    const {
      type,
      userId,
      otherUserId,
      bookId,
      bookshelfId,
      bookTagId,
      tagId,
      reviewId,
      commentId,
      otherCommentId,
      reviewReactionId,
      commentReactionId
    } = input;

    return await ActionModel.create({
      type,
      datetime: new Date(),
      userId,
      otherUserId,
      bookId,
      bookshelfId,
      bookTagId,
      tagId,
      reviewId,
      commentId,
      otherCommentId,
      reviewReactionId,
      commentReactionId
    });
  } catch (error) {
    throw error;
  }
}
