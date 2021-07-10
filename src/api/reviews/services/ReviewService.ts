import Review from "../models/Review";
import addComment from "./addComment";
import addReviewReaction from "./addReviewReaction";
import addReviewUpvote from "./addReviewUpvote";
import createReview from "./createReview";

interface ReviewService {
  createReview(body: string, bookId: string, rating: number, reviewerId: string): Promise<Review>;
  addReviewUpvote(reviewId: string, reviewUpvoteId: string): Promise<void>;
  addComment(commentId: string, reviewId: string): Promise<void>;
  addReviewReaction(reviewId: string, reviewReactionId: string): Promise<void>;
}

export default class RealReviewService implements ReviewService {
  public async createReview(body: string, bookId: string, rating: number, reviewerId: string): Promise<Review> {
    return await createReview(body, bookId, rating, reviewerId);
  }

  public async addReviewUpvote(reviewId: string, reviewUpvoteId: string): Promise<void> {
    return await addReviewUpvote(reviewId, reviewUpvoteId);
  }

  public async addComment(commentId: string, reviewId: string): Promise<void> {
    return await addComment(commentId, reviewId);
  }

  public async addReviewReaction(reviewId: string, reviewReactionId: string): Promise<void> {
    return await addReviewReaction(reviewId, reviewReactionId);
  }
}
