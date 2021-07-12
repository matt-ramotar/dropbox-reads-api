import { RelationshipAlreadyExists, ReviewNotFound } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { ReviewModel } from "../../../models";

export default async function addReview(commentId: string, reviewId: string): Promise<void> {
  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) throw new ReviewNotFound();

    if (isIn(commentId, review.commentIds)) throw new RelationshipAlreadyExists();

    if (review.commentIds) review.commentIds.push(commentId);
    else review.commentIds = [commentId];

    await review.save();
  } catch (error) {
    throw error;
  }
}
