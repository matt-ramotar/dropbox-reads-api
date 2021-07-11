import { DocumentType } from "@typegoose/typegoose";
import { BookModel } from "../../../models";
import Book from "../models/Book";

export default async function createBook(
  googleId: string,
  title: string,
  authorId: string,
  userId: string,
  coverImage?: string
): Promise<DocumentType<Book>> {
  try {
    return await BookModel.create({
      googleId,
      title,
      coverImage,
      authorId,
      userAddedById: userId
    });
  } catch (error) {
    throw error;
  }
}
