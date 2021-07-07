import { Body, Controller, Hidden, Post, Route, Tags } from "tsoa";
import { CreateBookshelfInput } from "../entities/CreateBookshelfInput";
import Bookshelf from "../models/Bookshelf";
import RealBookshelfService from "../services/BookshelfService";

@Route("bookshelves")
@Tags("Bookshelf")
export class BookshelfController extends Controller {
  /** Create bookshelf */
  @Hidden()
  @Post()
  async createBookshelf(@Body() input: CreateBookshelfInput): Promise<Bookshelf> {
    return await new RealBookshelfService().createBookshelf(input);
  }
}
