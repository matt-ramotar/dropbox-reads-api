import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import BookTagUpvote from "../../booktagupvotes/models/BookTagUpvote";
import Tag from "../../tags/models/Tag";
import User from "../../users/models/User";
import { GodBookTag, RealGodBookTag } from "./GodBookTag";

/**
 * @tsoaModel
 */

@ObjectType({ description: "BookTag model" })
export default class BookTag {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Book })
  bookId!: string;

  @Field(() => ID)
  @prop({ ref: () => Tag })
  tagId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  userAddedById!: string;

  @Field(() => ID)
  @prop({ ref: () => BookTagUpvote })
  upvoteIds?: string[];

  public async toGodBookTag(this: DocumentType<BookTag>): Promise<GodBookTag> {
    const godBookTag = new RealGodBookTag(this._id);
    await godBookTag.populate();
    return godBookTag;
  }

  public toPojo(this: DocumentType<BookTag>): BookTag {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
