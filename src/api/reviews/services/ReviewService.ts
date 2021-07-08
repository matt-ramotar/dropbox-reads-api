import Review from "../models/Review";
import createReview from "./createReview";

interface ReviewService {
  createReview(body: string, bookId: string, rating: number, reviewerId: string): Promise<Review>;
}

export default class RealReviewService implements ReviewService {
  public async createReview(body: string, bookId: string, rating: number, reviewerId: string): Promise<Review> {
    return await createReview(body, bookId, rating, reviewerId);
  }
}
