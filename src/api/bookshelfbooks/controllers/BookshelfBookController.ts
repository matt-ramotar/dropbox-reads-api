import { Body, Controller, Post, Route, Tags } from "tsoa";
import { CreateBookshelfBookInput } from "../entities/CreateBookInput";
import BookshelfBook from "../models/BookshelfBook";
import RealBookshelfBookService from "../services/BookshelfBookService";

@Route("bookshelfbooks")
@Tags("BookshelfBook")
export class BookshelfBookController extends Controller {
  /** Create bookshelf book */
  @Post()
  async createBookshelfBook(@Body() input: CreateBookshelfBookInput): Promise<BookshelfBook> {
    const { userId, bookshelfId, bookId, reason } = input;

    // const bookService = new RealBookService();
    // const userService = new RealUserService();

    const bookshelfBook = await new RealBookshelfBookService().createBookshelfBook(bookId, bookshelfId, userId, reason);

    // const action = await new RealActionService().createAction({
    //   type: ActionType.CreateBook,
    //   userId,
    //   bookId: book.id
    // });

    // await userService.addBook(book.id, userId);
    // await userService.addAction(action._id, userId);
    // await userService.publishAction(action._id, userId);

    return bookshelfBook;
  }
}
