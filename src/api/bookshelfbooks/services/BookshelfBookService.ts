import BookshelfBook from "../models/BookshelfBook";
import createBookshelfBook from "./createBookshelfBook";

interface BookshelfBookService {
  createBookshelfBook(bookId: string, bookshelfId: string, userId: string, reason?: string): Promise<BookshelfBook>;
}

export default class RealBookshelfBookService implements BookshelfBookService {
  public async createBookshelfBook(bookId: string, bookshelfId: string, userId: string, reason?: string): Promise<BookshelfBook> {
    return await createBookshelfBook(bookId, bookshelfId, userId, reason);
  }
}
