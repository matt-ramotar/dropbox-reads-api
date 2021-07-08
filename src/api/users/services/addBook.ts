import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addBook(bookId: string, userId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw UserNotFound;

    if (user.booksAdded) user.booksAdded.push(bookId);
    else user.booksAdded = [bookId];
    await user.save();
  } catch (error) {
    throw error;
  }
}
