import { CreateAuthorInput } from "../entities/CreateAuthorInput";
import Author from "../models/Author";
import createAuthor from "./createAuthor";

interface AuthorService {
  createAuthor(input: CreateAuthorInput): Promise<Author>;
}

export default class RealAuthorService implements AuthorService {
  public async createAuthor(input: CreateAuthorInput): Promise<Author> {
    return await createAuthor(input);
  }
}
