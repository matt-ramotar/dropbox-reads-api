import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";
import { SafeUser } from "../models/SafeUser";

export default async function addBookshelf(userId: string, bookshelfId: string): Promise<SafeUser | null> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw UserNotFound;

    if (user.bookshelves) user.bookshelves.push(bookshelfId);
    else user.bookshelves = [bookshelfId];
    await user.save();

    return user.toSafeUser();
  } catch (error) {
    throw error;
  }
}
