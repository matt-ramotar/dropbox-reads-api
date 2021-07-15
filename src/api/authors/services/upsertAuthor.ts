import { AuthorModel } from "../../../models";
import { CreateAuthorInput } from "../entities/CreateAuthorInput";
import Author from "../models/Author";

export default async function upsertAuthor(input: CreateAuthorInput): Promise<Author> {
  try {
    const { firstName, lastName } = input;

    let author = await AuthorModel.findOne({ firstName, lastName });
    if (!author) author = await AuthorModel.create({ firstName, lastName });
    return author.toPojo();
  } catch (error) {
    throw error;
  }
}
