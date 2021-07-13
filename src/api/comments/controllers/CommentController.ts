import RealBookService from "src/api/books/services/BookService";
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

    if (reviewId) await new RealReviewService().addComment(comment._id, reviewId);
    if (bookId) ;
    if (parentCommentId) commentService.addChildComment(comment._id, parentCommentId);

    const action = await new RealActionService().createAction({
      type: reviewId ? ActionType.AddCommentToReview : ActionType.AddCommentToComment,
      userId,
      commentId: comment._id,
      otherCommentId: parentCommentId,
      reviewId
    });

    await userService.addAction(action._id, userId);
    await userService.publishAction(action._id, userId);

    return comment;
  }
}
