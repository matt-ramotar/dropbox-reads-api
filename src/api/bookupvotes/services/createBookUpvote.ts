import { RelationshipAlreadyExists } from "../../../errors";
import { BookUpvoteModel } from "../../../models";
import BookUpvote from "../../bookupvotes/models/BookUpvote";

export default async function createBookUpvote(bookId: string, userId: string): Promise<BookUpvote> {
  try {
    if (await BookUpvoteModel.exists({ bookId: bookId, userId: userId })) {
      throw new RelationshipAlreadyExists();
    }

    const bookUpvote = await BookUpvoteModel.create({
      bookId,
      userId
    });

    return await bookUpvote.toPojo();
  } catch (error) {
    throw error;
  }
}
