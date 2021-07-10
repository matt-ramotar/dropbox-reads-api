import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import Comment from "../../comments/models/Comment";
import ReviewUpvote from "../../reviewupvotes/models/ReviewUpvote";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Review model" })
export default class Review {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => User, type: () => String })
  reviewer!: string;

  @Field(() => ID)
  @prop({ ref: () => Book, type: () => String })
  book!: string;

  @Field(() => ID)
  @prop({ ref: () => ReviewUpvote, type: () => String })
  upvotes?: string[];

  @Field(() => ID)
  @prop({ ref: () => Comment, type: () => String })
  comments?: string[];

  @Field()
  @prop()
  rating!: number;

  @Field()
  @prop()
  body!: string;
}
