import { BookshelfBookModel } from "../../../models";
import BookshelfBook from "../models/BookshelfBook";

export default async function createBookshelfBook(bookId: string, bookshelfId: string, userId: string, reason?: string): Promise<BookshelfBook> {
  try {
    const bookshelfBook = await BookshelfBookModel.create({ bookId, bookshelfId, userId, reason });
    return bookshelfBook.toPojo();
  } catch (error) {
    throw error;
  }
}
