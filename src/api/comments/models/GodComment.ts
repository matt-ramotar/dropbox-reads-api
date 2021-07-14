import { DocumentType } from "@typegoose/typegoose";
import Book from "../../books/models/Book";
import { GodBook } from "src/api/books/models/GodBook";
import { CommentNotFound } from "../../../errors";
import { CommentModel } from "../../../models";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import CommentUpvote from "../../commentupvotes/models/CommentUpvote";
import Review from "../../reviews/models/Review";
import { SafeUser } from "../../users/models/SafeUser";
import User from "../../users/models/User";
import Comment from "./Comment";

export interface GodComment {
  id: string;
  user: SafeUser;
  review?: Review;
  parentComment?: GodComment;
  childrenComments?: GodComment[];
  body: string;
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  book?: GodBook;
}

export class RealGodComment implements GodComment {
  readonly id: string;
  user!: SafeUser;
  review?: Review;
  parentComment?: GodComment;
  childrenComments?: GodComment[];
  readonly body: string;
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  book?: GodBook;

  constructor(id: string, body: string) {
    this.id = id;
    this.body = body;
  }

  public async populate() {
    try {
      const comment = await CommentModel.findById(this.id)
        .populate("userId")
        .populate("reviewId")
        .populate("parentCommentId")
        .populate("childrenCommentIds")
        .populate("commentUpvoteIds")
        .populate("commentReactionIds")
        .populate("bookId")
        .exec();

      if (!comment) throw new CommentNotFound();

      this.user = (comment.userId as DocumentType<User>).toSafeUser();
      this.review = comment.reviewId as DocumentType<Review>;

      if (comment.parentCommentId) this.parentComment = await (comment.parentCommentId as DocumentType<Comment>).toGodComment();

      const childrenComments = [];

      for (const childComment of comment.childrenCommentIds as DocumentType<Comment>[]) {
        childrenComments.push(await childComment.toGodComment());
      }

      this.childrenComments = childrenComments;

      this.commentUpvotes = comment.commentUpvoteIds as DocumentType<CommentUpvote>[];
      this.commentReactions = comment.commentReactionIds as DocumentType<CommentReaction>[];

      if (comment.bookId) this.book = await (comment.bookId as DocumentType<Book>).toGodBook();
    } catch (error) {
      throw error;
    }
  }
}
