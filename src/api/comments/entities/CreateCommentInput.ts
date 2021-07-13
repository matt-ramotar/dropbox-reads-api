export interface CreateCommentInput {
  userId: string;
  reviewId?: string;
  bookId?: string;
  parentCommentId?: string;
  body: string;
}
