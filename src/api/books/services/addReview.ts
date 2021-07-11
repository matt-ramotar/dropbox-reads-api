import { BookNotFound, RelationshipAlreadyExists } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { BookModel } from "../../../models";

export default async function addReview(bookId: string, reviewId: string): Promise<void> {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();

    if (isIn(reviewId, book.reviewIds)) throw new RelationshipAlreadyExists();

    if (book.reviewIds) book.reviewIds.push(reviewId);
    else book.reviewIds = [reviewId];
    await book.save();
  } catch (error) {
    throw error;
  }
}
