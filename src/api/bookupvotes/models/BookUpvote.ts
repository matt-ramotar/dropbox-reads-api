import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "BookUpvote model" })
export default class BookUpvote {
  @Field(() => ID)
  @prop({ ref: () => BookUpvote })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Book })
  bookId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;
}