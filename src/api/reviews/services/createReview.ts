import { ReviewModel } from "../../../models";
import Review from "../models/Review";

export default async function createReview(body: string, bookId: string, rating: number, reviewerId: string): Promise<Review> {
  try {
    const review = await ReviewModel.create({
      body,
      bookId,
      rating,
      reviewerId
    });

    return await review.toPojo();
  } catch (error) {
    throw error;
  }
}
