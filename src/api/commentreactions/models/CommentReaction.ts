import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Comment from "../../comments/models/Comment";
import Reaction from "../../reactions/models/Reaction";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Comment reaction model" })
export default class CommentReaction {
  @Field(() => ID)
  @prop({ ref: () => CommentReaction })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Comment })
  comment!: Ref<Comment, string>;

  @Field(() => ID)
  @prop({ ref: () => User })
  reactor!: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => Reaction })
  reaction!: Ref<Reaction, string>;
}
