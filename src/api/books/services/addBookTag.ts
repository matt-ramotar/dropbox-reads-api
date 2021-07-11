import { BookNotFound, RelationshipAlreadyExists } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { BookModel } from "../../../models";

export default async function addBookTag(bookId: string, bookTagId: string): Promise<void> {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();

    if (isIn(bookTagId, book.bookTagIds)) throw new RelationshipAlreadyExists();

    if (book.bookTagIds) book.bookTagIds.push(bookTagId);
    else book.bookTagIds = [bookTagId];
    await book.save();
  } catch (error) {
    throw error;
  }
}
