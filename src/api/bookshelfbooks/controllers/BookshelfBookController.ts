import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealBookService from "../../books/services/BookService";
import RealBookshelfService from "../../bookshelves/services/BookshelfService";
import RealUserService from "../../users/services/UserService";
import { CreateBookshelfBookInput } from "../entities/CreateBookshelfBookInput";
import BookshelfBook from "../models/BookshelfBook";
import RealBookshelfBookService from "../services/BookshelfBookService";

@Route("bookshelfbooks")
@Tags("BookshelfBook")
export class BookshelfBookController extends Controller {
  /** Create bookshelf book */
  @Post()
  async createBookshelfBook(@Body() input: CreateBookshelfBookInput): Promise<BookshelfBook> {
    const { userId, bookshelfId, bookId, reason } = input;

    const bookService = new RealBookService();
    const bookshelfService = new RealBookshelfService();
    const userService = new RealUserService();

    const bookshelfBook = await new RealBookshelfBookService().createBookshelfBook(bookId, bookshelfId, userId, reason);

    await bookshelfService.addBookshelfBook(bookshelfBook.id, bookshelfId);
    await bookService.addBookshelf(bookId, bookshelfId);

    const action = await new RealActionService().createAction({
      type: ActionType.AddBookToBookshelf,
      userId,
      bookId,
      bookshelfId,
      bookshelfBookId: bookshelfBook.id
    });

    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    return bookshelfBook;
  }
}
