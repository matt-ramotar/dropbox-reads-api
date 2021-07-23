import Author from "../models/Author";
import createAuthor from "./createAuthor";

interface AuthorService {
  createAuthor(firstName: string, lastName: string, name: string): Promise<Author>;
}

export default class RealAuthorService implements AuthorService {
  public async createAuthor(firstName: string, lastName: string, name: string): Promise<Author> {
    return await createAuthor(firstName, lastName, name);
  }
}
