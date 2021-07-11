import Bookshelf from "../models/Bookshelf";
import { GodBookshelf } from "../models/GodBookshelf";
import addBook from "./addBook";
import createBookshelf from "./createBookshelf";
import getGodBookshelfById from "./getGodBookshelfById";

interface BookshelfService {
  createBookshelf(name: string, description: string, ownerId: string, tagIds: string[]): Promise<Bookshelf>;
  addBook(bookId: string, bookshelfId: string): Promise<void>;
  getGodBookshelfById(bookshelfId: string): Promise<GodBookshelf>;
}

export default class RealBookshelfService implements BookshelfService {
  public async createBookshelf(name: string, description: string, ownerId: string, tagIds: string[]): Promise<Bookshelf> {
    return await createBookshelf(name, description, ownerId, tagIds);
  }

  public async addBook(bookId: string, bookshelfId: string): Promise<void> {
    return await addBook(bookId, bookshelfId);
  }

  public async getGodBookshelfById(bookshelfId: string): Promise<GodBookshelf> {
    return await getGodBookshelfById(bookshelfId);
  }
}
