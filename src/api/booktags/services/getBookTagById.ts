import { DocumentType } from "@typegoose/typegoose";
import { BookTagNotFound } from "../../../errors";
import { BookTagModel } from "../../../models";
import BookTag from "../models/BookTag";

export default async function getBookTagById(bookTagId: string): Promise<DocumentType<BookTag>> {
  try {
    const bookTag = await BookTagModel.findById(bookTagId);
    if (!bookTag) throw new BookTagNotFound();
    return bookTag;
  } catch (error) {
    throw error;
  }
}
