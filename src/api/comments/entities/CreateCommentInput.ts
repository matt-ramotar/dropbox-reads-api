export interface CreateCommentInput {
  userId: string;
  reviewId?: string;
  parentCommentId?: string;
  body: string;
}
