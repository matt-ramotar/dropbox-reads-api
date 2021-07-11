import { DocumentType } from "@typegoose/typegoose";
import BookTag from "../models/BookTag";
import createBookTag from "./createBookTag";

interface BookTagService {
  createBookTag(bookId: string, tagId: string, userId: string): Promise<DocumentType<BookTag>>;
}

export default class RealBookTagService implements BookTagService {
  public async createBookTag(bookId: string, tagId: string, userId: string): Promise<DocumentType<BookTag>> {
    return await createBookTag(bookId, tagId, userId);
  }
}
