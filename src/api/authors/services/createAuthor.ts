import { ObjectAlreadyExists } from "../../../errors";
import { AuthorModel } from "../../../models";
import { CreateAuthorInput } from "../entities/CreateAuthorInput";
import Author from "../models/Author";

export default async function createAuthor(input: CreateAuthorInput): Promise<Author> {
  try {
    const { firstName, lastName } = input;

    if (await AuthorModel.exists({firstName: firstName, lastName: lastName})) {
      throw new ObjectAlreadyExists();
    }

    return await AuthorModel.create({ firstName, lastName });
  } catch (error) {
    throw error;
  }
}
