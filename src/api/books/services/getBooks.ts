import { DocumentType } from "@typegoose/typegoose";
import { BookModel } from "../../../models";
import Book from "../models/Book";

export default async function getBooks(): Promise<DocumentType<Book>[]> {
  try {
    return await BookModel.find({});
  } catch (error) {
    throw error;
  }
}
