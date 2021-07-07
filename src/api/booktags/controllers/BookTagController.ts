import { Body, Controller, Hidden, Post, Route, Tags } from "tsoa";
import { CreateBookTagInput } from "../entities/CreateBookTagInput";
import BookTag from "../models/BookTag";
import RealBookTagService from "../services/BookTagService";

@Route("booktags")
@Tags("BookTag")
export class BookTagController extends Controller {
  /** Create book tag */
  @Hidden()
  @Post()
  async createBookTag(@Body() input: CreateBookTagInput): Promise<BookTag> {
    return await new RealBookTagService().createBookTag(input);
  }
}
