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
  @prop({ ref: () => Review, type: () => String })
  review!: string;

  @Field(() => ID)
  @prop({ ref: () => User, type: () => String })
  reactor!: string;

  @Field(() => ID)
  @prop({ ref: () => Reaction, type: () => String })
  reaction!: string;
}
