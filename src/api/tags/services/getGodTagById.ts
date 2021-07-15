import { TagNotFound } from "../../../errors";
import { TagModel } from "../../../models";
import { GodTag } from "../models/GodTag";

export default async function getGodTagById(tagId: string): Promise<GodTag> {
  try {
    // Try to find either as tagId or tagName
    console.log(tagId);
    const tag = await TagModel.findOne({
      $or: [
        {id: tagId},
        {tag: {$regex: tagId, $options: "i"}},
      ]
    });
    console.log(tag);
    if (!tag) throw new TagNotFound();
    return await tag.toGodTag();
  } catch (error) {
    throw error;
  }
}
