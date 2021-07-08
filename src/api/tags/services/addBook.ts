import { TagNotFound } from "../../../errors";
import { TagModel } from "../../../models";

export default async function addBook(bookId: string, tagId: string): Promise<void> {
  try {
    const tag = await TagModel.findById(tagId);
    if (!tag) throw new TagNotFound();

    if (tag.books) tag.books.push(bookId);
    else tag.books = [bookId];
    await tag.save();
  } catch (error) {
    throw error;
  }
}
