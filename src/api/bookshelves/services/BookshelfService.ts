import Bookshelf from "../models/Bookshelf";
import addBook from "./addBook";
import createBookshelf from "./createBookshelf";

interface BookshelfService {
  createBookshelf(name: string, description: string, ownerId: string, tagIds: string[]): Promise<Bookshelf>;
  addBook(bookId: string, bookshelfId: string): Promise<void>;
}

export default class RealBookshelfService implements BookshelfService {
  public async createBookshelf(
    name: string,
    description: string,
    ownerId: string,
    tagIds: string[]
  ): Promise<Bookshelf> {
    return await createBookshelf(name, description, ownerId, tagIds);
  }

  public async addBook(bookId: string, bookshelfId: string): Promise<void> {
    return await addBook(bookId, bookshelfId);
  }
}
