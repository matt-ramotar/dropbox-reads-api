import { BookNotFound, TagNotFound, UserNotFound } from "../../../errors";
import { BookModel, BookTagModel, TagModel, UserModel } from "../../../models";
import { CreateBookTagInput } from "../entities/CreateBookTagInput";
import BookTag from "../models/BookTag";

export default async function createBookTag(input: CreateBookTagInput): Promise<BookTag> {
  try {
    const { bookId, tagId, userId } = input;

    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const book = await BookModel.findById(bookId);
    if (!book) throw new BookNotFound();

    const tag = await TagModel.findById(tagId);
    if (!tag) throw new TagNotFound();

    const bookTag = await BookTagModel.create({ book: bookId, tag: tagId, userAddedBy: userId });

    if (user.bookTagsAdded) user.bookTagsAdded.push(bookTag.id);
    else user.bookTagsAdded = [bookTag.id];
    await user.save();

    // if (book.tags) book.tags.push(bookTag.id);
    // else book.tags = [bookTag.id];
    // await book.save();

    // if (tag.books) tag.books.push(book.id);
    // else tag.books = [book.id];

    return bookTag;
  } catch (error) {
    throw error;
  }
}
