import { BookNotFound } from "../../../errors";
import { BookModel } from "../../../models";
import { GodBook } from "../models/GodBook";

export default async function getGodBookById(bookId: string): Promise<GodBook> {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();
    return await book.toGodBook();
  } catch (error) {
    throw error;
  }
}
