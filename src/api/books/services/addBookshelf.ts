import { BookNotFound, RelationshipAlreadyExists } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { BookModel } from "../../../models";

export default async function addBookshelf(bookId: string, bookshelfId: string): Promise<void> {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();

    if (isIn(bookshelfId, book.bookshelfIds)) throw new RelationshipAlreadyExists();

    if (book.bookshelfIds) book.bookshelfIds.push(bookshelfId);
    else book.bookshelfIds = [bookshelfId];
    await book.save();
  } catch (error) {
    throw error;
  }
}
