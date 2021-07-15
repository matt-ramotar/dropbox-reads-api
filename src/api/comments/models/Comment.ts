import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import CommentUpvote from "../../commentupvotes/models/CommentUpvote";
import Review from "../../reviews/models/Review";
import User from "../../users/models/User";
import { GodComment, RealGodComment } from "./GodComment";

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
  userId!: string;

  @Field(() => ID)
  @prop({ ref: () => Review })
  reviewId?: string;

  @Field(() => ID)
  @prop({ ref: () => Comment })
  parentCommentId?: string;

  @Field(() => ID)
  @prop({ ref: () => Comment })
  childrenCommentIds?: string[];

  @Field()
  @prop()
  body!: string;

  @Field(() => ID)
  @prop({ ref: () => CommentUpvote })
  commentUpvoteIds?: string[];

  @Field(() => ID)
  @prop({ ref: () => CommentReaction })
  commentReactionIds?: string[];

  @Field(() => ID)
  @prop({ ref: () => Book })
  bookId?: string;

  public async toGodComment(this: DocumentType<Comment>): Promise<GodComment> {
    const godComment = new RealGodComment(this._id, this.body);
    await godComment.populate();
    return godComment;
  }

  public async toPojo(this: DocumentType<Comment>): Promise<Comment> {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
