import { AuthorModel, BookModel, UserModel } from "../../../models";
import { CreateBookInput } from "../entities/CreateBookInput";
import Book from "../models/Book";

export default async function createBook(input: CreateBookInput): Promise<Book> {
  try {
    const { googleId, title, coverImage, author: authorId, tags: tagIds, userAddedBy: userId } = input;

    const user = await UserModel.findById(userId);
    if (!user) throw new Error();

    const author = await AuthorModel.findById(authorId);
    if (!author) throw new Error();

    const book = await BookModel.create({
      googleId,
      title,
      coverImage,
      author: author.id,
      tags: tagIds,
      userAddedBy: user.id
    });

    if (user.booksAdded) user.booksAdded.push(book.id);
    else user.booksAdded = [book.id];
    await user.save();

    return book;
  } catch (error) {
    throw error;
  }
}
