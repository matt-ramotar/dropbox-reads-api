import { ReviewModel } from "../../../models";
import Review from "../models/Review";

export default async function createReview(
  body: string,
  bookId: string,
  rating: number,
  reviewerId: string
): Promise<Review> {
  try {
    return await ReviewModel.create({
      body,
      book: bookId,
      rating,
      reviewer: reviewerId
    });
  } catch (error) {
    throw error;
  }
}
