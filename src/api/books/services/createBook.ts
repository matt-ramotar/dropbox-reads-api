import { ObjectAlreadyExists } from "../../../errors";
import { BookModel } from "../../../models";
import Book from "../models/Book";

export default async function createBook(
  googleId: string,
  title: string,
  authorId: string,
  userId: string,
  coverImage?: string
): Promise<Book> {
  try {
    if (await BookModel.exists({ googleId: googleId })) {
      throw new ObjectAlreadyExists();
    }

    const book = await BookModel.create({
      googleId,
      title,
      coverImage,
      authorId,
      userAddedById: userId
    });

    return await book.toPojo();
  } catch (error) {
    throw error;
  }
}
