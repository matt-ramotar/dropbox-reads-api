import { ReviewNotFound, ReviewUpvoteNotFound } from "../../../errors";
import { ReviewModel, ReviewUpvoteModel } from "../../../models";

export default async function addReviewUpvote(reviewId: string, reviewUpvoteId: string): Promise<void> {
  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) throw new ReviewNotFound();

    const reviewUpvote = await ReviewUpvoteModel.findById(reviewUpvoteId);
    if (!reviewUpvote) throw new ReviewUpvoteNotFound();

    if (review.upvotes) review.upvotes.push(reviewUpvoteId);
    else review.upvotes = [reviewUpvoteId];

    await review.save();
  } catch (error) {
    throw error;
  }
}
