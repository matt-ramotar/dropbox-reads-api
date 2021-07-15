import BookUpvote from "../models/BookUpvote";
import createBookUpvote from "./createBookUpvote";

interface BookUpvoteService {
  createBookUpvote(bookId: string, userId: string): Promise<BookUpvote>;
}

export default class RealBookUpvoteService implements BookUpvoteService {
  public async createBookUpvote(bookId: string, userId: string): Promise<BookUpvote> {
    return await createBookUpvote(bookId, userId);
  }
}
