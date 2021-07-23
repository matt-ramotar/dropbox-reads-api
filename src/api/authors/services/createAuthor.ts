import { AuthorModel } from "../../../models";
import Author from "../models/Author";

export default async function createAuthor(firstName: string, lastName: string, name: string): Promise<Author> {
  try {
    const author = await AuthorModel.create({ firstName, lastName, name });
    return author.toPojo();
  } catch (error) {
    throw error;
  }
}
