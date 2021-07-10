import { ReviewReactionNotFound, UserNotFound } from "../../../errors";
import { ReviewReactionModel, UserModel } from "../../../models";

export default async function addReviewReaction(userId: string, reviewReactionId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const reviewReaction = await ReviewReactionModel.findById(reviewReactionId);
    if (!reviewReaction) throw new ReviewReactionNotFound();

    if (user.reviewReactionIds) user.reviewReactionIds.push(reviewReactionId);
    else user.reviewReactionIds = [reviewReactionId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
