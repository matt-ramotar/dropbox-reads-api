import { DocumentType } from "@typegoose/typegoose";
import { ObjectAlreadyExists } from "../../../errors";
import { BookModel } from "../../../models";
import Book from "../models/Book";

export default async function createBook(
  googleId: string,
  title: string,
  description: string,
  authorId: string,
  userId: string,
  coverImage?: string
): Promise<DocumentType<Book>> {
  try {
    if (await BookModel.exists({googleId: googleId})) {
      throw new ObjectAlreadyExists();
    }

    return await BookModel.create({
      googleId,
      title,
      description,
      coverImage,
      authorId,
      userAddedById: userId
    });
  } catch (error) {
    throw error;
  }
}
