import RealBookService from "../../books/services/BookService";
import { Body, Controller, Post, Route, Tags } from "tsoa";
import { GodBook } from "../../books/models/GodBook";
import SearchInput from "../entities/SearchInput";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
  @Post()
  async search(@Body() input: SearchInput): Promise<GodBook[]> {
    const { keyword, title, author, tags } = input;
    return await new RealBookService().getBooksMatchingKeyword(keyword, title, author, tags);
  }
}