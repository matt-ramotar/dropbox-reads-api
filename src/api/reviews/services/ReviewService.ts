import Review from "../models/Review";
import addReviewUpvote from "./addReviewUpvote";
import createReview from "./createReview";

interface ReviewService {
  createReview(body: string, bookId: string, rating: number, reviewerId: string): Promise<Review>;
  addReviewUpvote(reviewId: string, reviewUpvoteId: string): Promise<void>;
}

export default class RealReviewService implements ReviewService {
  public async createReview(body: string, bookId: string, rating: number, reviewerId: string): Promise<Review> {
    return await createReview(body, bookId, rating, reviewerId);
  }

  public async addReviewUpvote(reviewId: string, reviewUpvoteId: string): Promise<void> {
    return await addReviewUpvote(reviewId, reviewUpvoteId);
  }
}
