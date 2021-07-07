import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
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
  review!: Ref<Review, string>;

  @Field(() => ID)
  @prop({ ref: () => User })
  reactor!: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => Reaction })
  reaction!: Ref<Reaction, string>;
}
