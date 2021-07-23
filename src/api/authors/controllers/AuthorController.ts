import { Body, Controller, Post, Route, Tags } from "tsoa";
import { AuthorModel } from "../../../models";
import { CreateAuthorInput } from "../entities/CreateAuthorInput";
import Author from "../models/Author";
import RealAuthorService from "../services/AuthorService";

@Route("authors")
@Tags("Author")
export class AuthorController extends Controller {
  /** Upsert author */
  @Post()
  async createAuthor(@Body() input: CreateAuthorInput): Promise<Author> {
    const { firstName, lastName, name } = input;
    if (await AuthorModel.findOne({ name })) return (await AuthorModel.findOne({ name }))!.toPojo();
    return await new RealAuthorService().createAuthor(firstName, lastName, name);
  }
}
