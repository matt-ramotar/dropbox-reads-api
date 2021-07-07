import { Body, Controller, Post, Route, Tags } from "tsoa";
import { AddBookInput } from "../entities/AddBookInput";
import { CreateBookshelfInput } from "../entities/CreateBookshelfInput";
import Bookshelf from "../models/Bookshelf";
import RealBookshelfService from "../services/BookshelfService";

@Route("bookshelves")
@Tags("Bookshelf")
export class BookshelfController extends Controller {
  /** Create bookshelf */
  @Post()
  async createBookshelf(@Body() input: CreateBookshelfInput): Promise<Bookshelf> {
    return await new RealBookshelfService().createBookshelf(input);
  }

  /** Add book to bookshelf */
  @Post("{bookshelfId}/books")
  async addBook(@Body() input: AddBookInput): Promise<Bookshelf> {
    return await new RealBookshelfService().addBook(input);
  }
}
