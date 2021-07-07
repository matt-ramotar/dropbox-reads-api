import { CreateTagInput } from "../entities/CreateTagInput";
import Tag from "../models/Tag";
import createTag from "./createTag";

interface TagService {
  createTag(input: CreateTagInput): Promise<Tag>;
}

export default class RealTagService implements TagService {
  public async createTag(input: CreateTagInput): Promise<Tag> {
    return await createTag(input);
  }
}
