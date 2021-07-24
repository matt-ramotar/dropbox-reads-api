import { BookshelfBookNotFound, BookshelfNotFound, RelationshipAlreadyExists } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { BookshelfBookModel, BookshelfModel } from "../../../models";

export default async function addBookshelfBook(bookshelfBookId: string, bookshelfId: string): Promise<void> {
  try {
    const bookshelf = await BookshelfModel.findById(bookshelfId);
    if (!bookshelf) throw new BookshelfNotFound();

    const bookshelfBook = await BookshelfBookModel.findById(bookshelfBookId);
    if (!bookshelfBook) throw new BookshelfBookNotFound();

    if (isIn(bookshelfBookId, bookshelf.bookshelfBookIds)) throw new RelationshipAlreadyExists();

    if (bookshelf.bookshelfBookIds) bookshelf.bookshelfBookIds.push(bookshelfBookId);
    else bookshelf.bookshelfBookIds = [bookshelfBookId];

    await bookshelf.save();
  } catch (error) {
    throw error;
  }
}
