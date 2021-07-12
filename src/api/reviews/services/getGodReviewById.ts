import { ReviewNotFound } from "../../../errors";
import { ReviewModel } from "../../../models";
import { GodReview } from "../models/GodReview";

export default async function getGodReviewById(reviewId: string): Promise<GodReview> {
  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) throw new ReviewNotFound();
    return await review.toGodReview();
  } catch (error) {
    throw error;
  }
}
