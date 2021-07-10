import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addBookTag(bookTagId: string, userId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw UserNotFound;

    if (user.bookTagsAddedIds) user.bookTagsAddedIds.push(bookTagId);
    else user.bookTagsAddedIds = [bookTagId];
    await user.save();
  } catch (error) {
    throw error;
  }
}
