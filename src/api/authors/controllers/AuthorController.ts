import { Body, Controller, Post, Route, Tags } from "tsoa";
import { CreateAuthorInput } from "../entities/CreateAuthorInput";
import Author from "../models/Author";
import RealAuthorService from "../services/AuthorService";

@Route("authors")
@Tags("Author")
export class AuthorController extends Controller {
  /** Create author */
  @Post()
  async createAuthor(@Body() input: CreateAuthorInput): Promise<Author> {
    return await new RealAuthorService().createAuthor(input);
  }
}
