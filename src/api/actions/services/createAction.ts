import { UserNotFound } from "../../../errors";
import { ActionModel, UserModel } from "../../../models";
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
      reviewReactionId,
      commentReactionId
    } = input;

    const action = await ActionModel.create({
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
      reviewReaction: reviewReactionId,
      commentReaction: commentReactionId
    });

    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    if (user.actions) user.actions.push(action.id);
    else user.actions = [action.id];
    await user.save();
    await user.publishAction(action.id);

    return action;
  } catch (error) {
    throw error;
  }
}
