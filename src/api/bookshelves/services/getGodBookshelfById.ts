import { BookshelfNotFound } from "../../../errors";
import { BookshelfModel } from "../../../models";
import { GodBookshelf } from "../models/GodBookshelf";

export default async function getGodBookshelfById(bookshelfId: string): Promise<GodBookshelf> {
  try {
    const bookshelf = await BookshelfModel.findById(bookshelfId);
    if (!bookshelf) throw new BookshelfNotFound();
    return await bookshelf.toGodBookshelf();
  } catch (error) {
    throw error;
  }
}
