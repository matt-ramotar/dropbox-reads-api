import BookTag from "../models/BookTag";
import { GodBookTag } from "../models/GodBookTag";
import createBookTag from "./createBookTag";
import getBookTagById from "./getBookTagById";
import getGodBookTagById from "./getGodBookTagById";

interface BookTagService {
  createBookTag(bookId: string, tagId: string, userId: string): Promise<BookTag>;
  getBookTagById(bookTagId: string): Promise<BookTag>;
  getGodBookTagById(bookTagId: string): Promise<GodBookTag>;
}

export default class RealBookTagService implements BookTagService {
  public async createBookTag(bookId: string, tagId: string, userId: string): Promise<BookTag> {
    return await createBookTag(bookId, tagId, userId);
  }

  public async getBookTagById(bookTagId: string): Promise<BookTag> {
    return await getBookTagById(bookTagId);
  }

  public async getGodBookTagById(bookTagId: string): Promise<GodBookTag> {
    return await getGodBookTagById(bookTagId);
  }
}
