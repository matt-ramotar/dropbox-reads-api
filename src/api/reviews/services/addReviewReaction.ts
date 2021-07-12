import { ReviewNotFound, ReviewReactionNotFound } from "../../../errors";
import { ReviewModel, ReviewReactionModel } from "../../../models";

export default async function addReviewReaction(reviewId: string, reviewReactionId: string): Promise<void> {
  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) throw new ReviewNotFound();

    const reviewReaction = await ReviewReactionModel.findById(reviewReactionId);
    if (!reviewReaction) throw new ReviewReactionNotFound();

    if (review.reviewReactionIds) review.reviewReactionIds.push(reviewReactionId);
    else review.reviewReactionIds = [reviewReactionId];

    await review.save();
  } catch (error) {
    throw error;
  }
}
