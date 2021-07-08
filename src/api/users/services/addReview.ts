import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addReview(reviewId: string, userId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw UserNotFound;

    if (user.reviews) user.reviews.push(reviewId);
    else user.reviews = [reviewId];
    await user.save();
  } catch (error) {
    throw error;
  }
}
