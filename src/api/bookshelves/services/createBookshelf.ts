import { BookshelfModel } from "../../../models";
import Bookshelf from "../models/Bookshelf";

export default async function createBookshelf(
  name: string,
  description: string,
  userId: string,
  tagIds?: string[],
  coverImage?: string
): Promise<Bookshelf> {
  try {
    const bookshelf = await BookshelfModel.create({
      name,
      description,
      userId,
      tagIds,
      coverImage
    });

    return bookshelf.toPojo();
  } catch (error) {
    throw error;
  }
}
