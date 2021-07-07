import { TagModel } from "../../../models";
import Tag from "../models/Tag";

export default async function getTags(): Promise<Tag[]> {
  return await TagModel.find();
}
