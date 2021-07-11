import { DocumentType } from "@typegoose/typegoose";
import { BookTagModel } from "../../../models";
import BookTag from "../models/BookTag";

export default async function createBookTag(bookId: string, tagId: string, userId: string): Promise<DocumentType<BookTag>> {
  try {
    return await BookTagModel.create({ book: bookId, tag: tagId, userAddedBy: userId });
  } catch (error) {
    throw error;
  }
}
