import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealReactionService from "../../reactions/services/ReactionService";
import RealReviewService from "../../reviews/services/ReviewService";
import RealUserService from "../../users/services/UserService";
import { CreateReviewReactionInput } from "../entities/CreateReviewReactionInput";
import ReviewReaction from "../models/ReviewReaction";
import RealReviewReactionService from "../services/ReviewReactionService";

@Route("reviewreactions")
@Tags("ReviewReaction")
export class ReviewReactionController extends Controller {
  /** React to review */
  @Post()
  async createReviewReaction(@Body() input: CreateReviewReactionInput): Promise<ReviewReaction> {
    const { reviewId, userId, reaction: reactionInput } = input;

    const actionService = new RealActionService();
    const reactionService = new RealReactionService();
    const reviewService = new RealReviewService();
    const reviewReactionService = new RealReviewReactionService();
    const userService = new RealUserService();

    const reaction = await reactionService.upsertReaction(reactionInput);
    const reviewReaction = await reviewReactionService.createReviewReaction(reviewId, userId, reaction.id);

    const action = await actionService.createAction({
      type: ActionType.ReactToReview,
      userId,
      reviewId,
      reviewReactionId: reviewReaction.id
    });

    await reviewService.addReviewReaction(reviewId, reviewReaction.id);
    await userService.addAction(action.id, userId);
    await userService.publishAction(action.id, userId);

    return reviewReaction;
  }
}
