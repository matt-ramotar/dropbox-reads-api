import { ActionModel } from "../../../models";
import { CreateActionInput } from "../entities/CreateActionInput";
import Action from "../models/Action";

export default async function createAction(input: CreateActionInput): Promise<Action> {
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
      user: userId,
      otherUser: otherUserId,
      book: bookId,
      bookshelf: bookshelfId,
      bookTag: bookTagId,
      tag: tagId,
      review: reviewId,
      comment: commentId,
      otherComment: otherCommentId,
      reviewReaction: reviewReactionId,
      commentReaction: commentReactionId
    });
  } catch (error) {
    throw error;
  }
}
