import { CreateBookInput } from "../entities/CreateBookInput";
import Book from "../models/Book";
import createBook from "./createBook";

interface BookService {
  createBook(input: CreateBookInput): Promise<Book>;
}

export default class RealBookService implements BookService {
  public async createBook(input: CreateBookInput): Promise<Book> {
    return await createBook(input);
  }
}
