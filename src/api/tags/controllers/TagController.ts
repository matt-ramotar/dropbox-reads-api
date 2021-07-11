import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { CreateTagInput } from "../entities/CreateTagInput";
import { GodTag } from "../models/GodTag";
import Tag from "../models/Tag";
import RealTagService from "../services/TagService";

@Route("tags")
@Tags("Tag")
export class TagController extends Controller {
  /** Create tag */
  @Post()
  async createTag(@Body() input: CreateTagInput): Promise<Tag> {
    return await new RealTagService().createTag(input);
  }

  /** Get tags */
  @Get()
  async getTags(): Promise<Tag[]> {
    return await new RealTagService().getTags();
  }

  /** Get god tag by ID */
  @Get("{tagId}/god")
  async getGodTagById(@Path() tagId: string): Promise<GodTag> {
    return await new RealTagService().getGodTagById(tagId);
  }
}
