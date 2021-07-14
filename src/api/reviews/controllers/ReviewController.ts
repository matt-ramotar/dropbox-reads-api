import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealBookService from "../../books/services/BookService";
import RealUserService from "../../users/services/UserService";
import { CreateReviewInput } from "../entities/CreateReviewInput";
import { GodReview } from "../models/GodReview";
import Review from "../models/Review";
import RealReviewService from "../services/ReviewService";

@Route("reviews")
@Tags("Review")
export class ReviewController extends Controller {
  /** Create review */
  @Post()
  async createReview(@Body() input: CreateReviewInput): Promise<Review> {
    const { body, bookId, rating, reviewerId } = input;

    const userService = new RealUserService();

    const review = await new RealReviewService().createReview(body, bookId, rating, reviewerId);

    const action = await new RealActionService().createAction({
      type: ActionType.CreateReview,
      userId: reviewerId,
      bookId,
      reviewId: review._id
    });

    await userService.addReview(review._id, reviewerId);
    await userService.addAction(action._id, reviewerId);
    await userService.publishAction(action._id, reviewerId);

    await new RealBookService().addReview(bookId, review._id);

    return review;
  }

  /** Get god review by ID */
  @Get("{reviewId}/god")
  async getGodReviewById(@Path() reviewId: string): Promise<GodReview> {
    return await new RealReviewService().getGodReviewById(reviewId);
  }
}
