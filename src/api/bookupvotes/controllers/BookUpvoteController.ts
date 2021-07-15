import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealBookService from "../../books/services/BookService";
import BookUpvote from "../../bookupvotes/models/BookUpvote";
import RealUserService from "../../users/services/UserService";
import { CreateBookUpvoteInput } from "../entities/CreateBookUpvoteInput";
import RealBookUpvoteService from "../services/BookUpvoteService";

@Route("bookupvotes")
@Tags("BookUpvote")
export class BookUpvoteController extends Controller {
  /** Upvote a book */
  @Post()
  async createBookUpvote(@Body() input: CreateBookUpvoteInput): Promise<BookUpvote> {
    const { bookId, userId } = input;
    const userService = new RealUserService();

    const bookUpvote = await new RealBookUpvoteService().createBookUpvote(bookId, userId);

    await new RealBookService().addBookUpvote(bookId, bookUpvote.id);
    await userService.addBookUpvote(userId, bookUpvote.id);

    const action = await new RealActionService().createAction({
      type: ActionType.UpvoteBook,
      userId: userId,
      bookId: bookId
    });

    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    return bookUpvote;
  }
}
