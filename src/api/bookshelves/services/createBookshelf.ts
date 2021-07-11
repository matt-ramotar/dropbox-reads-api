import { BookshelfModel } from "../../../models";
import Bookshelf from "../models/Bookshelf";

export default async function createBookshelf(name: string, description: string, ownerId: string, tagIds: string[]): Promise<Bookshelf> {
  try {
    return await BookshelfModel.create({
      name,
      description,
      userId: ownerId,
      tagIds
    });
  } catch (error) {
    throw error;
  }
}
