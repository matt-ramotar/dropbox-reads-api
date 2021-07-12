import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import Comment from "../../comments/models/Comment";
import ReviewReaction from "../../reviewreactions/models/ReviewReaction";
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
  @prop({ ref: () => User })
  reviewerId!: string;

  @Field(() => ID)
  @prop({ ref: () => Book })
  bookId!: string;

  @Field(() => ID)
  @prop({ ref: () => ReviewUpvote })
  reviewUpvoteIds?: string[];

  @Field(() => ID)
  @prop({ ref: () => Comment })
  commentIds?: string[];

  @Field(() => ID)
  @prop({ ref: () => ReviewReaction })
  reviewReactionIds?: string[];

  @Field()
  @prop()
  rating!: number;

  @Field()
  @prop()
  body!: string;
}
