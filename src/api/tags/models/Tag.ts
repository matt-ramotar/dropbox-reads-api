import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import User from "../../users/models/User";
import { GodTag, RealGodTag } from "./GodTag";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Tag model" })
export default class Tag {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field()
  @prop()
  tag!: string;

  @Field(() => [ID])
  @prop({ ref: () => Book })
  bookIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => User })
  userIds?: string[];

  public async toGodTag(this: DocumentType<Tag>): Promise<GodTag> {
    const godTag = new RealGodTag(this._id, this.tag);
    await godTag.populate();
    return godTag;
  }

  public toPojo(this: DocumentType<Tag>): Tag {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
