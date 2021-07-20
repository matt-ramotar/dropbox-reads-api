import { BookModel } from "../../../models";
import { GodBook } from "../models/GodBook";

export default async function getGodBooks(): Promise<GodBook[]> {
  try {
    const godBooks = [];
    const books = await BookModel.find();
    for (const book of books) {
      godBooks.push(await book.toGodBook());
    }
    return godBooks;
  } catch (error) {
    throw error;
  }
}
