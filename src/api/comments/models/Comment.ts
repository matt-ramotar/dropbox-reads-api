import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import CommentUpvote from "../../commentupvotes/models/CommentUpvote";
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
  @prop({ ref: () => User, type: () => String })
  user!: string;

  @Field(() => ID)
  @prop({ ref: () => Review, type: () => String })
  review?: string;

  @Field(() => ID)
  @prop({ ref: () => Comment, type: () => String })
  parentComment?: string;

  @Field(() => ID)
  @prop({ ref: () => Comment, type: () => String })
  childrenComments?: string[];

  @Field()
  @prop()
  body!: string;

  @Field(() => ID)
  @prop({ ref: () => CommentUpvote, type: () => String })
  upvotes?: string[];

  @Field(() => ID)
  @prop({ ref: () => CommentReaction, type: () => String })
  reactions?: string[];
}
