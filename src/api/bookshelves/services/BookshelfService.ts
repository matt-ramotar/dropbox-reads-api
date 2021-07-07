import { CreateBookshelfInput } from "../entities/CreateBookshelfInput";
import Bookshelf from "../models/Bookshelf";
import createBookshelf from "./createBookshelf";

interface BookshelfService {
  createBookshelf(input: CreateBookshelfInput): Promise<Bookshelf>;
}

export default class RealBookshelfService implements BookshelfService {
  public async createBookshelf(input: CreateBookshelfInput): Promise<Bookshelf> {
    return await createBookshelf(input);
  }
}
