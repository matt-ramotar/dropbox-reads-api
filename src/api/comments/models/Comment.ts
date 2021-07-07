import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Review from "../../reviews/models/Review";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Comment model" })
export default class Comment {
  @Field(() => ID)
  @prop({ ref: () => Comment })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  user!: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => Review })
  review!: Ref<Review, string>;

  @Field()
  @prop()
  body!: string;

  @Field(() => ID)
  @prop({ ref: () => CommentUpvote })
  upvotes?: Ref<CommentUpvote, string>[];

  @Field(() => ID)
  @prop({ ref: () => CommentReaction })
  reactions?: Ref<CommentReaction, string>[];
}
