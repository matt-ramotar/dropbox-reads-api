import { CreateAuthorInput } from "../entities/CreateAuthorInput";
import Author from "../models/Author";
import upsertAuthor from "./upsertAuthor";

interface AuthorService {
  upsertAuthor(input: CreateAuthorInput): Promise<Author>;
}

export default class RealAuthorService implements AuthorService {
  public async upsertAuthor(input: CreateAuthorInput): Promise<Author> {
    return await upsertAuthor(input);
  }
}
