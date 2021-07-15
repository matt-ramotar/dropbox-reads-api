import { ReviewReactionModel } from "../../../models";
import ReviewReaction from "../models/ReviewReaction";

export default async function createReviewReaction(reviewId: string, userId: string, reactionId: string): Promise<ReviewReaction> {
  try {
    const reviewReaction = await ReviewReactionModel.create({
      reviewId,
      userId,
      reactionId
    });

    return await reviewReaction.toPojo();
  } catch (error) {
    throw error;
  }
}
