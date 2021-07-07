import { CreateTagInput } from "../entities/CreateTagInput";
import Tag from "../models/Tag";
import createTag from "./createTag";
import getTags from "./getTags";

interface TagService {
  createTag(input: CreateTagInput): Promise<Tag>;
  getTags(): Promise<Tag[]>;
}

export default class RealTagService implements TagService {
  public async createTag(input: CreateTagInput): Promise<Tag> {
    return await createTag(input);
  }

  public async getTags(): Promise<Tag[]> {
    return await getTags();
  }
}
