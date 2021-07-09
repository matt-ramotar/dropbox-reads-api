import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealReviewService from "../../reviews/services/ReviewService";
import RealUserService from "../../users/services/UserService";
import { CreateReviewUpvoteInput } from "../entities/CreateReviewUpvoteInput";
import ReviewUpvote from "../models/ReviewUpvote";
import RealReviewUpvoteService from "../services/ReviewUpvoteService";

@Route("reviewupvotes")
@Tags("ReviewUpvote")
export class ReviewUpvoteController extends Controller {
  /** Upvote review */
  @Post()
  async createReviewUpvote(@Body() input: CreateReviewUpvoteInput): Promise<ReviewUpvote> {
    const { reviewId, userId } = input;

    const userService = new RealUserService();

    const reviewUpvote = await new RealReviewUpvoteService().createReviewUpvote(reviewId, userId);

    await new RealReviewService().addReviewUpvote(reviewId, reviewUpvote.id);
    await userService.addReviewUpvote(userId, reviewUpvote.id);

    const action = await new RealActionService().createAction({
      type: ActionType.UpvoteReview,
      userId,
      reviewId
    });

    await userService.addAction(action.id, userId);
    await userService.publishAction(action.id, userId);

    return reviewUpvote;
  }
}
