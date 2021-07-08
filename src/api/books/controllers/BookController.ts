import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealBookTagService from "../../booktags/services/BookTagService";
import RealUserService from "../../users/services/UserService";
import { CreateBookInput } from "../entities/CreateBookInput";
import Book from "../models/Book";
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
      const bookTag = await bookTagService.createBookTag(book.id, tagId, userId);

      await userService.addBookTag(bookTag.id, userId);
      await bookService.addBookTag(book.id, bookTag.id);
    }

    const action = await new RealActionService().createAction({
      type: ActionType.CreateBook,
      userId,
      bookId: book.id
    });

    await userService.addBook(book.id, userId);
    await userService.addAction(action.id, userId);
    await userService.publishAction(action.id, userId);

    return book;
  }
}
