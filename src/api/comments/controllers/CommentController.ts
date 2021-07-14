import RealBookService from "../../books/services/BookService";
import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealReviewService from "../../reviews/services/ReviewService";
import RealUserService from "../../users/services/UserService";
import { CreateCommentInput } from "../entities/CreateCommentInput";
import Comment from "../models/Comment";
import RealCommentService from "../services/CommentService";

@Route("comments")
@Tags("Comment")
export class CommentController extends Controller {
  /** Create comment */
  @Post()
  async createComment(@Body() input: CreateCommentInput): Promise<Comment> {
    const { userId, reviewId, bookId, parentCommentId } = input;

    const commentService = new RealCommentService();
    const userService = new RealUserService();

    const comment = await commentService.createComment(input);

    await userService.addComment(userId, comment._id);

    // if both bookId and reviewId are specified, the comment for the book will be taken in priority    
    if (bookId) await new RealBookService().addComment(bookId, comment._id);
    else if (reviewId) await new RealReviewService().addComment(comment._id, reviewId);
    
    if (parentCommentId) commentService.addChildComment(comment._id, parentCommentId);

    let actionType = ActionType.AddCommentToComment;
    if (bookId) actionType = ActionType.AddCommentToBook;
    else if (reviewId) actionType = ActionType.AddCommentToReview;

    const action = await new RealActionService().createAction({
      type: actionType,
      userId,
      commentId: comment._id,
      otherCommentId: parentCommentId,
      reviewId,
      bookId,
    });

    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    return comment;
  }
}
