import { RelationshipAlreadyExists, TagNotFound } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { TagModel } from "../../../models";

export default async function addBook(bookId: string, tagId: string): Promise<void> {
  try {
    const tag = await TagModel.findById(tagId);
    if (!tag) throw new TagNotFound();

    if (isIn(bookId, tag.bookIds)) throw new RelationshipAlreadyExists();

    if (tag.bookIds) tag.bookIds.push(bookId);
    else tag.bookIds = [bookId];

    await tag.save();
  } catch (error) {
    throw error;
  }
}
