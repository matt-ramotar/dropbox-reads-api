import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addReview(reviewId: string, userId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    if (user.reviewIds) user.reviewIds.push(reviewId);
    else user.reviewIds = [reviewId];
    await user.save();
  } catch (error) {
    throw error;
  }
}
