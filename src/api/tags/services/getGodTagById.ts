import { TagNotFound } from "../../../errors";
import { TagModel } from "../../../models";
import { GodTag } from "../models/GodTag";

export default async function getGodTagById(tagId: string): Promise<GodTag> {
  try {
    const tag = await TagModel.findById(tagId);
    if (!tag) throw new TagNotFound();
    return await tag.toGodTag();
  } catch (error) {
    throw error;
  }
}
