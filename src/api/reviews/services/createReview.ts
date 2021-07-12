import { DocumentType } from "@typegoose/typegoose";
import { ReviewModel } from "../../../models";
import Review from "../models/Review";

export default async function createReview(
  body: string,
  bookId: string,
  rating: number,
  reviewerId: string
): Promise<DocumentType<Review>> {
  try {
    return await ReviewModel.create({
      body,
      bookId,
      rating,
      reviewerId
    });
  } catch (error) {
    throw error;
  }
}
