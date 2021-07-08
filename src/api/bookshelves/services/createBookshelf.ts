import { BookshelfModel, UserModel } from "../../../models";
import Bookshelf from "../models/Bookshelf";

export default async function createBookshelf(
  name: string,
  description: string,
  ownerId: string,
  tagIds: string[]
): Promise<Bookshelf> {
  try {
    const user = await UserModel.findById(ownerId);
    if (!user) throw new Error();

    const bookshelf = await BookshelfModel.create({
      name,
      description,
      owner: ownerId,
      tags: tagIds
    });

    if (user.bookshelves) user.bookshelves.push(bookshelf.id);
    else user.bookshelves = [bookshelf.id];
    await user.save();

    return bookshelf;
  } catch (error) {
    throw error;
  }
}
