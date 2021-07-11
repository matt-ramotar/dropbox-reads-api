import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealBookService from "../../books/services/BookService";
import RealUserService from "../../users/services/UserService";
import { AddBookInput } from "../entities/AddBookInput";
import { CreateBookshelfInput } from "../entities/CreateBookshelfInput";
import Bookshelf from "../models/Bookshelf";
import { GodBookshelf } from "../models/GodBookshelf";
import RealBookshelfService from "../services/BookshelfService";

@Route("bookshelves")
@Tags("Bookshelf")
export class BookshelfController extends Controller {
  /** Create bookshelf */
  @Post()
  async createBookshelf(@Body() input: CreateBookshelfInput): Promise<Bookshelf> {
    const { name, description, userId, tagIds } = input;

    const userService = new RealUserService();

    const bookshelf = await new RealBookshelfService().createBookshelf(name, description, userId, tagIds);

    const action = await new RealActionService().createAction({
      type: ActionType.CreateBookshelf,
      userId: userId,
      bookshelfId: bookshelf.id
    });

    await userService.addBookshelf(userId, bookshelf.id);
    await userService.addAction(userId, action.id);
    await userService.publishAction(userId, action.id);

    return bookshelf;
  }

  /** Add book to bookshelf */
  @Post("{bookshelfId}/books")
  async addBook(@Body() input: AddBookInput): Promise<void> {
    const { userId, bookId, bookshelfId } = input;

    const userService = new RealUserService();

    await new RealBookshelfService().addBook(bookshelfId, bookId);
    await new RealBookService().addBookshelf(bookId, bookshelfId);

    const action = await new RealActionService().createAction({
      type: ActionType.AddBookToBookshelf,
      userId,
      bookId,
      bookshelfId
    });

    await userService.addAction(userId, action.id);
    await userService.publishAction(userId, action.id);
  }

  /** Get god bookshelf by ID */
  @Get("{bookshelfId}/god")
  async getGodBookshelfById(@Path() bookshelfId: string): Promise<GodBookshelf> {
    return await new RealBookshelfService().getGodBookshelfById(bookshelfId);
  }
}
