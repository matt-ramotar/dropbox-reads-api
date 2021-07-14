import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealBookService from "../../books/services/BookService";
import RealTagService from "../../tags/services/TagService";
import RealUserService from "../../users/services/UserService";
import { CreateBookTagInput } from "../entities/CreateBookTagInput";
import BookTag from "../models/BookTag";
import { GodBookTag } from "../models/GodBookTag";
import RealBookTagService from "../services/BookTagService";

@Route("booktags")
@Tags("BookTag")
export class BookTagController extends Controller {
  /** Create book tag */
  @Post()
  async createBookTag(@Body() input: CreateBookTagInput): Promise<BookTag> {
    const { bookId, tagId, userId } = input;

    const userService = new RealUserService();

    const bookTag = await new RealBookTagService().createBookTag(bookId, tagId, userId);

    await userService.addBookTag(bookTag._id, userId);
    await new RealBookService().addBookTag(bookId, bookTag._id);
    await new RealTagService().addBook(bookId, tagId);

    const action = await new RealActionService().createAction({
      type: ActionType.AddTagToBook,
      userId,
      bookId,
      bookTagId: bookTag._id,
      tagId
    });

    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    return bookTag;
  }

  /** Get god book tag by ID */
  @Get("{bookTagId}/god")
  async getGodBookTagById(@Path() bookTagId: string): Promise<GodBookTag> {
    return await new RealBookTagService().getGodBookTagById(bookTagId);
  }

  /** Get book tag by ID */
  @Get("{bookTagId}")
  async getBookTagById(@Path() bookTagId: string): Promise<BookTag> {
    return await new RealBookTagService().getBookTagById(bookTagId);
  }
}
