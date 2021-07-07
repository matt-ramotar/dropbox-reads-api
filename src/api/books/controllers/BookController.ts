import { Body, Controller, Hidden, Post, Route, Tags } from "tsoa";
import { CreateBookInput } from "../entities/CreateBookInput";
import Book from "../models/Book";
import RealBookService from "../services/BookService";

@Route("books")
@Tags("Book")
export class BookController extends Controller {
  /** Create book */
  @Hidden()
  @Post()
  async createBook(@Body() input: CreateBookInput): Promise<Book> {
    return await new RealBookService().createBook(input);
  }
}
