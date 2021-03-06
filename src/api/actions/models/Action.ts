import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import ActionReaction from "../../actionreactions/models/ActionReaction";
import Book from "../../books/models/Book";
import BookshelfBook from "../../bookshelfbooks/models/BookshelfBook";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import Comment from "../../comments/models/Comment";
import ReviewReaction from "../../reviewreactions/models/ReviewReaction";
import Review from "../../reviews/models/Review";
import Tag from "../../tags/models/Tag";
import User from "../../users/models/User";
import { GodAction, RealGodAction } from "./GodAction";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Action model" })
export default class Action {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field()
  @prop()
  type!: string;

  @Field()
  @prop()
  datetime!: Date;

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  otherUserId?: string;

  @Field(() => ID)
  @prop({ ref: () => Book })
  bookId?: string;

  @Field(() => ID)
  @prop({ ref: () => BookshelfBook })
  bookshelfBookId?: string;

  @Field(() => ID)
  @prop({ ref: () => Bookshelf })
  bookshelfId?: string;

  @Field(() => ID)
  @prop({ ref: () => BookTag })
  bookTagId?: string;

  @Field(() => ID)
  @prop({ ref: () => Tag })
  tagId?: string;

  @Field(() => ID)
  @prop({ ref: () => Review })
  reviewId?: string;

  @Field(() => ID)
  @prop({ ref: () => Comment })
  commentId?: string;

  @Field(() => ID)
  @prop({ ref: () => Comment })
  otherCommentId?: string;

  @Field(() => ID)
  @prop({ ref: () => ReviewReaction })
  reviewReactionId?: string;

  @Field(() => ID)
  @prop({ ref: () => CommentReaction })
  commentReactionId?: string;

  @Field(() => ID)
  @prop({ ref: () => ActionReaction })
  actionReactionId?: string;

  @Field(() => [ID])
  @prop({ ref: () => ActionReaction })
  actionReactionIds?: string[];

  public async toGodAction(this: DocumentType<Action>): Promise<GodAction> {
    const godAction = new RealGodAction(this._id, this.type, this.datetime);
    await godAction.populate({
      userId: this.userId,
      otherUserId: this.otherUserId,
      bookId: this.bookId,
      bookshelfBookId: this.bookshelfBookId,
      bookshelfId: this.bookshelfId,
      bookTagId: this.bookTagId,
      tagId: this.tagId,
      reviewId: this.reviewId,
      commentId: this.commentId,
      otherCommentId: this.otherCommentId,
      reviewReactionId: this.reviewReactionId,
      commentReactionId: this.commentReactionId,
      actionReactionId: this.actionReactionId,
      actionReactionIds: this.actionReactionIds
    });
    return godAction;
  }

  public toPojo(this: DocumentType<Action>): Action {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
