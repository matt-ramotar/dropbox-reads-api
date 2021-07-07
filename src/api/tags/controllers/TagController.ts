import { Body, Controller, Hidden, Post, Route, Tags } from "tsoa";
import { CreateTagInput } from "../entities/CreateTagInput";
import Tag from "../models/Tag";
import RealTagService from "../services/TagService";

@Route("tags")
@Tags("Tag")
export class TagController extends Controller {
  /** Create tag */
  @Hidden()
  @Post()
  async createTag(@Body() input: CreateTagInput): Promise<Tag> {
    return await new RealTagService().createTag(input);
  }
}
