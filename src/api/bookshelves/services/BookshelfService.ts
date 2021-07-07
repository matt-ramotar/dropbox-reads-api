import { AddBookInput } from "../entities/AddBookInput";
import { CreateBookshelfInput } from "../entities/CreateBookshelfInput";
import Bookshelf from "../models/Bookshelf";
import addBook from "./addBook";
import createBookshelf from "./createBookshelf";

interface BookshelfService {
  createBookshelf(input: CreateBookshelfInput): Promise<Bookshelf>;
  addBook(input: AddBookInput): Promise<Bookshelf>;
}

export default class RealBookshelfService implements BookshelfService {
  public async createBookshelf(input: CreateBookshelfInput): Promise<Bookshelf> {
    return await createBookshelf(input);
  }

  public async addBook(input: AddBookInput): Promise<Bookshelf> {
    return await addBook(input);
  }
}
