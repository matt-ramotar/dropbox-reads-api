import { DocumentType } from "@typegoose/typegoose";
import { RelationshipAlreadyExists } from "../../../errors";
import { BookTagModel } from "../../../models";
import BookTag from "../models/BookTag";

export default async function createBookTag(bookId: string, tagId: string, userId: string): Promise<DocumentType<BookTag>> {
  try {
    if (await BookTagModel.exists({bookId: bookId, tagId: tagId})) {
      throw new RelationshipAlreadyExists();
    }

    return await BookTagModel.create({ bookId, tagId, userAddedById: userId });
  } catch (error) {
    throw error;
  }
}
