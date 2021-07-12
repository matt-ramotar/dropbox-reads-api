import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Reaction from "../../reactions/models/Reaction";
import { default as Review, default as User } from "../../reviews/models/Review";

/**
 * @tsoaModel
 */

@ObjectType({ description: "ReviewReaction model" })
export default class ReviewReaction {
  @Field(() => ID)
  @prop({ ref: () => ReviewReaction })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Review })
  reviewId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;

  @Field(() => ID)
  @prop({ ref: () => Reaction })
  reactionId!: string;
}
