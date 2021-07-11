import { BookTagNotFound } from "../../../errors";
import { BookTagModel } from "../../../models";
import { GodBookTag } from "../models/GodBookTag";

export default async function getGodBookTagById(bookTagId: string): Promise<GodBookTag> {
  try {
    const bookTag = await BookTagModel.findById(bookTagId);
    if (!bookTag) throw new BookTagNotFound();
    return await bookTag.toGodBookTag();
  } catch (error) {
    throw error;
  }
}
