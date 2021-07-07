import { CreateBookTagInput } from "../entities/CreateBookTagInput";
import BookTag from "../models/BookTag";
import createBookTag from "./createBookTag";

interface BookTagService {
  createBookTag(input: CreateBookTagInput): Promise<BookTag>;
}

export default class RealBookTagService implements BookTagService {
  public async createBookTag(input: CreateBookTagInput): Promise<BookTag> {
    return await createBookTag(input);
  }
}
