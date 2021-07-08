import { BookshelfNotFound } from "../../../errors";
import { BookshelfModel } from "../../../models";

export default async function addBook(bookshelfId: string, bookId: string): Promise<void> {
  try {
    const bookshelf = await BookshelfModel.findById(bookshelfId);
    if (!bookshelf) throw new BookshelfNotFound();

    if (bookshelf.books) bookshelf.books.push(bookId);
    else bookshelf.books = [bookId];
    await bookshelf.save();
  } catch (error) {
    throw error;
  }
}
