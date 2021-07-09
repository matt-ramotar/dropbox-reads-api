import { ReviewUpvoteModel } from "../../../models";
import ReviewUpvote from "../models/ReviewUpvote";

export default async function createReviewUpvote(reviewId: string, userId: string): Promise<ReviewUpvote> {
  try {
    return await ReviewUpvoteModel.create({
      review: reviewId,
      upvoter: userId
    });
  } catch (error) {
    throw error;
  }
}
