import { RelationshipAlreadyExists } from "../../../errors";
import { BookTagModel } from "../../../models";
import BookTag from "../models/BookTag";

export default async function createBookTag(bookId: string, tagId: string, userId: string): Promise<BookTag> {
  try {
    if (await BookTagModel.exists({ bookId: bookId, tagId: tagId })) {
      throw new RelationshipAlreadyExists();
    }
    const bookTag = await BookTagModel.create({ bookId, tagId, userAddedById: userId });
    return await bookTag.toPojo();
  } catch (error) {
    throw error;
  }
}
