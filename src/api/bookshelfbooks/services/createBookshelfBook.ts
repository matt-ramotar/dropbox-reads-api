import { BookshelfBookModel } from "../../../models";
import BookshelfBook from "../models/BookshelfBook";

export default async function createBookshelfBook(
  bookId: string,
  bookshelfId: string,
  userId: string,
  reason?: string
): Promise<BookshelfBook> {
  try {
    return await BookshelfBookModel.create({ bookId, bookshelfId, userId, reason });
  } catch (error) {
    throw error;
  }
}
