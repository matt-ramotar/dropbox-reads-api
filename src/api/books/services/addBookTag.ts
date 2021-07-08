import { BookNotFound } from "../../../errors";
import { BookModel } from "../../../models";

export default async function addBookTag(bookId: string, bookTagId: string): Promise<void> {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();

    if (book.tags) book.tags.push(bookTagId);
    else book.tags = [bookTagId];
    await book.save();
  } catch (error) {
    throw error;
  }
}
