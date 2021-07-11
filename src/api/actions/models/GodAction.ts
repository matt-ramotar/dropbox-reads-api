import {
  BookNotFound,
  BookshelfNotFound,
  BookTagNotFound,
  CommentNotFound,
  CommentReactionNotFound,
  ReviewNotFound,
  ReviewReactionNotFound,
  TagNotFound,
  UserNotFound
} from "../../../errors";
import {
  BookModel,
  BookshelfModel,
  BookTagModel,
  CommentModel,
  CommentReactionModel,
  ReviewModel,
  ReviewReactionModel,
  TagModel,
  UserModel
} from "../../../models";
import Book from "../../books/models/Book";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import Comment from "../../comments/models/Comment";
import ReviewReaction from "../../reviewreactions/models/ReviewReaction";
import Review from "../../reviews/models/Review";
import Tag from "../../tags/models/Tag";
import User from "../../users/models/User";
import { Refs } from "../entities/Refs";

export interface GodAction {
  id: string;
  type: string;
  datetime: Date;
  user?: User;
  otherUser?: User;
  book?: Book;
  bookshelf?: Bookshelf;
  bookTag?: BookTag;
  tag?: Tag;
  review?: Review;
  comment?: Comment;
  otherComment?: Comment;
  reviewReaction?: ReviewReaction;
  commentReaction?: CommentReaction;
}

export class RealGodAction implements GodAction {
  readonly id: string;
  readonly type: string;
  readonly datetime: Date;
  user?: User;
  otherUser?: User;
  book?: Book;
  bookshelf?: Bookshelf;
  bookTag?: BookTag;
  tag?: Tag;
  review?: Review;
  comment?: Comment;
  otherComment?: Comment;
  reviewReaction?: ReviewReaction;
  commentReaction?: CommentReaction;

  constructor(id: string, type: string, datetime: Date) {
    this.id = id;
    this.type = type;
    this.datetime = datetime;
  }

  public async populate(refs: Refs) {
    const {
      userId,
      otherUserId,
      bookId,
      bookshelfId,
      bookTagId,
      tagId,
      reviewId,
      commentId,
      otherCommentId,
      reviewReactionId,
      commentReactionId
    } = refs;

    if (userId) await this.setUser(userId);
    if (otherUserId) await this.setOtherUser(otherUserId);
    if (bookId) await this.setBook(bookId);
    if (bookshelfId) await this.setBookshelf(bookshelfId);
    if (bookTagId) await this.setBookTag(bookTagId);
    if (tagId) await this.setTag(tagId);
    if (reviewId) await this.setReview(reviewId);
    if (commentId) await this.setComment(commentId);
    if (otherCommentId) await this.setOtherComment(otherCommentId);
    if (reviewReactionId) await this.setReviewReaction(reviewReactionId);
    if (commentReactionId) await this.setCommentReaction(commentReactionId);
  }

  private async setUser(id: string): Promise<void> {
    try {
      const user = await UserModel.findById(id);
      if (!user) throw new UserNotFound();
      else this.user = user;
    } catch (error) {
      throw error;
    }
  }

  private async setOtherUser(id: string): Promise<void> {
    try {
      const otherUser = await UserModel.findById(id);
      if (!otherUser) throw new UserNotFound();
      else this.otherUser = otherUser;
    } catch (error) {
      throw error;
    }
  }

  private async setBook(id: string): Promise<void> {
    try {
      const book = await BookModel.findById(id);
      if (!book) throw new BookNotFound();
      else this.book = book;
    } catch (error) {
      throw error;
    }
  }

  private async setBookshelf(id: string): Promise<void> {
    try {
      const bookshelf = await BookshelfModel.findById(id);
      if (!bookshelf) throw new BookshelfNotFound();
      else this.bookshelf = bookshelf;
    } catch (error) {
      throw error;
    }
  }

  private async setBookTag(id: string): Promise<void> {
    try {
      const bookTag = await BookTagModel.findById(id);
      if (!bookTag) throw new BookTagNotFound();
      else this.bookTag = bookTag;
    } catch (error) {
      throw error;
    }
  }

  private async setTag(id: string): Promise<void> {
    try {
      const tag = await TagModel.findById(id);
      if (!tag) throw new TagNotFound();
      else this.tag = tag;
    } catch (error) {
      throw error;
    }
  }

  private async setReview(id: string): Promise<void> {
    try {
      const review = await ReviewModel.findById(id);
      if (!review) throw new ReviewNotFound();
      else this.review = review;
    } catch (error) {
      throw error;
    }
  }

  private async setComment(id: string): Promise<void> {
    try {
      const comment = await CommentModel.findById(id);
      if (!comment) throw new CommentNotFound();
      else this.comment = comment;
    } catch (error) {
      throw error;
    }
  }

  private async setOtherComment(id: string): Promise<void> {
    try {
      const otherComment = await CommentModel.findById(id);
      if (!otherComment) throw new CommentNotFound();
      else this.comment = otherComment;
    } catch (error) {
      throw error;
    }
  }

  private async setReviewReaction(id: string): Promise<void> {
    try {
      const reviewReaction = await ReviewReactionModel.findById(id);
      if (!reviewReaction) throw new ReviewReactionNotFound();
      else this.reviewReaction = reviewReaction;
    } catch (error) {
      throw error;
    }
  }

  private async setCommentReaction(id: string): Promise<void> {
    try {
      const commentReaction = await CommentReactionModel.findById(id);
      if (!commentReaction) throw new CommentReactionNotFound();
      else this.commentReaction = commentReaction;
    } catch (error) {
      throw error;
    }
  }
}
