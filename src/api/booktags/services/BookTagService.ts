import BookTag from "../models/BookTag";
import createBookTag from "./createBookTag";

interface BookTagService {
  createBookTag(bookId: string, tagId: string, userId: string): Promise<BookTag>;
}

export default class RealBookTagService implements BookTagService {
  public async createBookTag(bookId: string, tagId: string, userId: string): Promise<BookTag> {
    return await createBookTag(bookId, tagId, userId);
  }
}
