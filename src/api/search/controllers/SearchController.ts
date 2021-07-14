import RealBookService from "../../books/services/BookService";
import { Controller, Get, Path, Route, Tags } from "tsoa";
import { GodBook } from "../../books/models/GodBook";

@Route("search")
@Tags("Search")
export class SearchController extends Controller {
  /** Search in book author, title, and tag fields */
  @Get("{keyword}")
  async search(@Path() keyword: string): Promise<GodBook[]> {
    return await new RealBookService().getBooksMatchingKeyword(keyword);
  }
}