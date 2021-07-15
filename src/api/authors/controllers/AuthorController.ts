import { Body, Controller, Post, Route, Tags } from "tsoa";
import { CreateAuthorInput } from "../entities/CreateAuthorInput";
import Author from "../models/Author";
import RealAuthorService from "../services/AuthorService";

@Route("authors")
@Tags("Author")
export class AuthorController extends Controller {
  /** Upsert author */
  @Post()
  async upsertAuthor(@Body() input: CreateAuthorInput): Promise<Author> {
    return await new RealAuthorService().upsertAuthor(input);
  }
}
