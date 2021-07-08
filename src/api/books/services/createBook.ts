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
    return await BookModel.create({
      googleId,
      title,
      coverImage,
      author: authorId,
      userAddedBy: userId
    });
  } catch (error) {
    throw error;
  }
}
