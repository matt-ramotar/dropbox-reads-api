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
  @prop({ ref: () => BookTag })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Book })
  book!: Ref<Book, string>;

  @Field(() => ID)
  @prop({ ref: () => Tag })
  tag!: Ref<Tag, string>;

  @Field(() => ID)
  @prop({ ref: () => User })
  userAddedBy!: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => BookTagUpvote })
  upvotes?: Ref<BookTagUpvote, string>[];
}
