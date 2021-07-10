import { ReviewNotFound, ReviewReactionNotFound } from "../../../errors";
import { ReviewModel, ReviewReactionModel } from "../../../models";

export default async function addReviewReaction(reviewId: string, reviewReactionId: string): Promise<void> {
  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) throw new ReviewNotFound();

    const reviewReaction = await ReviewReactionModel.findById(reviewReactionId);
    if (!reviewReaction) throw new ReviewReactionNotFound();

    if (review.reactions) review.reactions.push(reviewReactionId);
    else review.reactions = [reviewReactionId];

    await review.save();
  } catch (error) {
    throw error;
  }
}
