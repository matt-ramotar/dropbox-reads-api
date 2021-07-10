import ReviewReaction from "../models/ReviewReaction";
import createReviewReaction from "./createReviewReaction";

interface ReviewReactionService {
  createReviewReaction(reviewId: string, userId: string, reactionId: string): Promise<ReviewReaction>;
}

export default class RealReviewReactionService implements ReviewReactionService {
  public async createReviewReaction(reviewId: string, userId: string, reactionId: string): Promise<ReviewReaction> {
    return await createReviewReaction(reviewId, userId, reactionId);
  }
}
