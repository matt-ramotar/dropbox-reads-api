import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import BookTagUpvote from "../../booktagupvotes/models/BookTagUpvote";
import Tag from "../../tags/models/Tag";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "BookTag model" })
export default class BookTag {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Book, type: () => String })
  book!: Ref<Book, string>;

  @Field(() => ID)
  @prop({ ref: () => Tag, type: () => String })
  tag!: Ref<Tag, string>;

  @Field(() => ID)
  @prop({ ref: () => User, type: () => String })
  userAddedBy!: string;

  @Field(() => ID)
  @prop({ ref: () => BookTagUpvote, type: () => String })
  upvotes?: string[];
}
