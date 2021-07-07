import { BookshelfModel, UserModel } from "../../../models";
import { CreateBookshelfInput } from "../entities/CreateBookshelfInput";
import Bookshelf from "../models/Bookshelf";

export default async function createBookshelf(input: CreateBookshelfInput): Promise<Bookshelf> {
  try {
    const { name, description, owner, tags } = input;

    const user = await UserModel.findById(owner);
    if (!user) throw new Error();

    const bookshelf = await BookshelfModel.create({
      name,
      description,
      owner,
      tags
    });

    if (user.bookshelves) user.bookshelves.push(bookshelf.id);
    else user.bookshelves = [bookshelf.id];
    await user.save();

    return bookshelf;
  } catch (error) {
    throw error;
  }
}
