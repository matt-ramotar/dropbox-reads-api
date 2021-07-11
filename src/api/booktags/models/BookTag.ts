import { prop } from "@typegoose/typegoose";
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
}
