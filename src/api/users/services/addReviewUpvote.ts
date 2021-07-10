import { ReviewUpvoteNotFound, UserNotFound } from "../../../errors";
import { ReviewUpvoteModel, UserModel } from "../../../models";

export default async function addReviewUpvote(userId: string, reviewUpvoteId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const reviewUpvote = await ReviewUpvoteModel.findById(reviewUpvoteId);
    if (!reviewUpvote) throw new ReviewUpvoteNotFound();

    if (user.reviewUpvoteIds) user.reviewUpvoteIds.push(reviewUpvoteId);
    else user.reviewUpvoteIds = [reviewUpvoteId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
