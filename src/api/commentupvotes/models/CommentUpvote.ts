import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Comment from "../../comments/models/Comment";
import { default as User } from "../../reviews/models/Review";

/**
 * @tsoaModel
 */

@ObjectType({ description: "CommentUpvote model" })
export default class CommentUpvote {
  @Field(() => ID)
  @prop({ ref: () => CommentUpvote })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Comment })
  comment!: Ref<Comment, string>;

  @Field(() => ID)
  @prop({ ref: () => User })
  upvoter!: Ref<User, string>;
}
