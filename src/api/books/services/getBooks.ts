import { BookModel } from "../../../models";
import Book from "../models/Book";

export default async function getBooks(): Promise<Book[]> {
  try {
    const pojos = [];
    const books = await BookModel.find();
    for (const book of books) {
      pojos.push(await book.toPojo());
    }
    return pojos;
  } catch (error) {
    throw error;
  }
}
