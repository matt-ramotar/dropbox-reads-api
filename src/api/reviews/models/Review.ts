import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import ReviewUpvote from "../../reviewupvotes/models/ReviewUpvote";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Review model" })
export default class Review {
  @Field(() => ID)
  @prop({ ref: () => Review })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  reviewer!: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => Book })
  book!: Ref<Book, string>;

  @Field(() => ID)
  @prop({ ref: () => ReviewUpvote })
  upvotes?: Ref<ReviewUpvote, string>[];

  @Field()
  @prop()
  rating!: number;

  @Field()
  @prop()
  body!: string;
}
