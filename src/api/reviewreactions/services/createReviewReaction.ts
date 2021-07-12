import { ReviewReactionModel } from "../../../models";
import ReviewReaction from "../models/ReviewReaction";

export default async function createReviewReaction(reviewId: string, userId: string, reactionId: string): Promise<ReviewReaction> {
  try {
    return await ReviewReactionModel.create({
      reviewId,
      userId,
      reactionId
    });
  } catch (error) {
    throw error;
  }
}
