import { BookNotFound } from "../../../errors";
import { BookModel } from "../../../models";

export default async function addReview(bookId: string, reviewId: string): Promise<void> {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();

    if (book.reviews) book.reviews.push(reviewId);
    else book.reviews = [reviewId];
    await book.save();
  } catch (error) {
    throw error;
  }
}
