import { ReviewNotFound } from "../../../errors";
import { ReviewModel } from "../../../models";

export default async function addReview(commentId: string, reviewId: string): Promise<void> {
  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) throw new ReviewNotFound();

    if (review.comments) review.comments.push(commentId);
    else review.comments = [commentId];
    await review.save();
  } catch (error) {
    throw error;
  }
}
