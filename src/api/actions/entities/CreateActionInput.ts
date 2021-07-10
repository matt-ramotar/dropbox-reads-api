import { ActionType } from "../models/ActionType";

export interface CreateActionInput {
  type: ActionType;
  userId: string;
  otherUserId?: string;
  bookId?: string;
  bookshelfId?: string;
  bookTagId?: string;
  tagId?: string;
  reviewId?: string;
  commentId?: string;
  otherCommentId?: string;
  reviewReactionId?: string;
  commentReactionId?: string;
}
