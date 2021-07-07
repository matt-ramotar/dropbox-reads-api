import { TagModel } from "../../../models";
import { CreateTagInput } from "../entities/CreateTagInput";
import Tag from "../models/Tag";

export default async function createTag(input: CreateTagInput): Promise<Tag> {
  try {
    const { tag } = input;

    return await TagModel.create({ tag });
  } catch (error) {
    throw error;
  }
}
