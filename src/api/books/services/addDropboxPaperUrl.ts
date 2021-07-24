import { BookNotFound } from "../../../errors";
import { BookModel } from "../../../models";

export default async function addDropboxPaperUrl(bookId: string, dropboxPaperUrl: string): Promise<void> {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();
    book.dropboxPaperUrl = dropboxPaperUrl;
    await book.save();
  } catch (error) {
    throw error;
  }
}
