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
    const { userId, reviewId, parentId } = input;

    const commentService = new RealCommentService();
    const userService = new RealUserService();

    const comment = await commentService.createComment(input);

    await userService.addComment(userId, comment.id);

    if (reviewId) await new RealReviewService().addComment(comment.id, reviewId);
    if (parentId) commentService.addChildComment(comment.id, parentId);

    const action = await new RealActionService().createAction({
      type: reviewId ? ActionType.AddCommentToReview : ActionType.AddCommentToComment,
      userId,
      commentId: comment.id,
      otherCommentId: parentId,
      reviewId
    });

    await userService.addAction(action.id, userId);
    await userService.publishAction(action.id, userId);

    return comment;
  }
}
