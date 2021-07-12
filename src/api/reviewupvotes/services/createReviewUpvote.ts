import { ReviewUpvoteModel } from "../../../models";
import ReviewUpvote from "../models/ReviewUpvote";

export default async function createReviewUpvote(reviewId: string, userId: string): Promise<ReviewUpvote> {
  try {
    return await ReviewUpvoteModel.create({
      reviewId,
      userId
    });
  } catch (error) {
    throw error;
  }
}
