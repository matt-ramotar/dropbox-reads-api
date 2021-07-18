import { DocumentType, prop } from "@typegoose/typegoose";
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
  commentId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;

  @Field(() => ID)
  @prop({ ref: () => Reaction })
  reactionId!: string;

  public toPojo(this: DocumentType<CommentReaction>): CommentReaction {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
