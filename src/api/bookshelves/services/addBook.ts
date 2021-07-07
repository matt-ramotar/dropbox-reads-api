import { BookNotFound, BookshelfNotFound } from "../../../errors";
import { BookModel, BookshelfModel } from "../../../models";
import { AddBookInput } from "../entities/AddBookInput";
import Bookshelf from "../models/Bookshelf";

export default async function addBook(input: AddBookInput): Promise<Bookshelf> {
  try {
    const { bookId, bookshelfId } = input;

    const bookshelf = await BookshelfModel.findById(bookshelfId);
    if (!bookshelf) throw new BookshelfNotFound();

    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();

    if (bookshelf.books) bookshelf.books.push(book.id);
    else bookshelf.books = [book.id];
    await bookshelf.save();

    if (book.bookshelves) book.bookshelves.push(bookshelf.id);
    else book.bookshelves = [bookshelf.id];
    await book.save();

    return bookshelf;
  } catch (error) {
    throw error;
  }
}
