import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addBookTag(bookTagId: string, userId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw UserNotFound;

    if (user.bookTagsAdded) user.bookTagsAdded.push(bookTagId);
    else user.bookTagsAdded = [bookTagId];
    await user.save();
  } catch (error) {
    throw error;
  }
}
