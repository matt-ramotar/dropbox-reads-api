import { BookNotFound } from "../../../errors";
import { BookModel } from "../../../models";

export default async function addBookshelf(bookId: string, bookshelfId: string): Promise<void> {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();

    if (book.bookshelves) book.bookshelves.push(bookshelfId);
    else book.bookshelves = [bookshelfId];
    await book.save();
  } catch (error) {
    throw error;
  }
}
