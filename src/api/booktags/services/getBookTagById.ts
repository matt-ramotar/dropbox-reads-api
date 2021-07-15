import { BookTagNotFound } from "../../../errors";
import { BookTagModel } from "../../../models";
import BookTag from "../models/BookTag";

export default async function getBookTagById(bookTagId: string): Promise<BookTag> {
  try {
    const bookTag = await BookTagModel.findById(bookTagId);
    if (!bookTag) throw new BookTagNotFound();
    return await bookTag.toPojo();
  } catch (error) {
    throw error;
  }
}
