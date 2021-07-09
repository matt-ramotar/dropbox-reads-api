import ReviewUpvote from "../models/ReviewUpvote";
import createReviewUpvote from "./createReviewUpvote";

interface ReviewUpvoteService {
  createReviewUpvote(reviewId: string, userId: string): Promise<ReviewUpvote>;
}

export default class RealReviewUpvoteService implements ReviewUpvoteService {
  public async createReviewUpvote(reviewId: string, userId: string): Promise<ReviewUpvote> {
    return await createReviewUpvote(reviewId, userId);
  }
}
