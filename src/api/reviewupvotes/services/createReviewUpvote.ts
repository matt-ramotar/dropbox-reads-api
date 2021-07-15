import { ReviewUpvoteModel } from "../../../models";
import ReviewUpvote from "../models/ReviewUpvote";

export default async function createReviewUpvote(reviewId: string, userId: string): Promise<ReviewUpvote> {
  try {
    const reviewUpvote = await ReviewUpvoteModel.create({
      reviewId,
      userId
    });

    return await reviewUpvote.toPojo();
  } catch (error) {
    throw error;
  }
}
