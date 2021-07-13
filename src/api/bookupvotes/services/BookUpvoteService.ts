import BookUpvote from "../models/BookUpvote";
import createBookUpvote from "./createBookUpvote";
import { DocumentType } from "@typegoose/typegoose";

interface BookUpvoteService {
  createBookUpvote(bookId: string, userId: string): Promise<DocumentType<BookUpvote>>;
}

export default class RealBookUpvoteService implements BookUpvoteService {
  public async createBookUpvote(bookId: string, userId: string): Promise<DocumentType<BookUpvote>> {
    return await createBookUpvote(bookId, userId);
  }
}
