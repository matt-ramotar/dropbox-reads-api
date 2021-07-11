import { BookshelfNotFound, RelationshipAlreadyExists } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { BookshelfModel } from "../../../models";

export default async function addBook(bookshelfId: string, bookId: string): Promise<void> {
  try {
    const bookshelf = await BookshelfModel.findById(bookshelfId);
    if (!bookshelf) throw new BookshelfNotFound();

    if (isIn(bookId, bookshelf.bookIds)) throw new RelationshipAlreadyExists();

    if (bookshelf.bookIds) bookshelf.bookIds.push(bookId);
    else bookshelf.bookIds = [bookId];

    await bookshelf.save();
  } catch (error) {
    throw error;
  }
}
