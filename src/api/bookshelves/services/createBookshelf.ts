import { BookshelfModel } from "../../../models";
import Bookshelf from "../models/Bookshelf";

export default async function createBookshelf(name: string, description: string, ownerId: string, tagIds: string[]): Promise<Bookshelf> {
  try {
    return await BookshelfModel.create({
      name,
      description,
      owner: ownerId,
      tags: tagIds
    });
  } catch (error) {
    throw error;
  }
}
