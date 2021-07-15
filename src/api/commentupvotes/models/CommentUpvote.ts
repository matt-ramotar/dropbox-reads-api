import { DocumentType, prop } from "@typegoose/typegoose";
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
  commentId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;

  public async toPojo(this: DocumentType<CommentUpvote>): Promise<CommentUpvote> {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
