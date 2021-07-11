import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealBookTagService from "../../booktags/services/BookTagService";
import RealUserService from "../../users/services/UserService";
import { CreateBookInput } from "../entities/CreateBookInput";
import Book from "../models/Book";
import { GodBook } from "../models/GodBook";
import RealBookService from "../services/BookService";

@Route("books")
@Tags("Book")
export class BookController extends Controller {
  /** Create book */
  @Post()
  async createBook(@Body() input: CreateBookInput): Promise<Book> {
    const { googleId, title, coverImage, authorId, tagIds, userId } = input;

    const bookService = new RealBookService();
    const bookTagService = new RealBookTagService();
    const userService = new RealUserService();

    const book = await new RealBookService().createBook(googleId, title, authorId, userId, coverImage);

    for (const tagId of tagIds) {
      const bookTag = await bookTagService.createBookTag(book._id, tagId, userId);

      await userService.addBookTag(bookTag._id, userId);
      await bookService.addBookTag(book._id, bookTag._id);
    }

    const action = await new RealActionService().createAction({
      type: ActionType.CreateBook,
      userId,
      bookId: book._id
    });

    await userService.addBook(book._id, userId);
    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    return book;
  }

  /** Get god book by ID */
  @Get("{bookId}")
  async getGodBookById(@Path() bookId: string): Promise<GodBook> {
    return await new RealBookService().getGodBookById(bookId);
  }
}
