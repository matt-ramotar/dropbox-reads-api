export interface CreateCommentInput {
  userId: string;
  reviewId?: string;
  parentId?: string;
  body: string;
}
