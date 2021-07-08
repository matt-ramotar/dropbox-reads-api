import { Body, Controller, Hidden, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealBookService from "../../books/services/BookService";
import RealTagService from "../../tags/services/TagService";
import RealUserService from "../../users/services/UserService";
import { CreateBookTagInput } from "../entities/CreateBookTagInput";
import BookTag from "../models/BookTag";
import RealBookTagService from "../services/BookTagService";

@Route("booktags")
@Tags("BookTag")
export class BookTagController extends Controller {
  /** Create book tag */
  @Hidden()
  @Post()
  async createBookTag(@Body() input: CreateBookTagInput): Promise<BookTag> {
    const { bookId, tagId, userId } = input;

    const userService = new RealUserService();

    const bookTag = await new RealBookTagService().createBookTag(bookId, tagId, userId);

    await userService.addBookTag(bookTag.id, userId);
    await new RealBookService().addBookTag(bookId, bookTag.id);
    await new RealTagService().addBook(bookId, tagId);

    const action = await new RealActionService().createAction({
      type: ActionType.AddTagToBook,
      userId,
      bookId,
      bookTagId: bookTag.id,
      tagId
    });

    await userService.addAction(action.id, userId);
    await userService.publishAction(action.id, userId);

    return bookTag;
  }
}
