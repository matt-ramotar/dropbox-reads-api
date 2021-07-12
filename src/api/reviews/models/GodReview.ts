import { DocumentType } from "@typegoose/typegoose";
import { ReviewNotFound } from "../../../errors";
import { ReviewModel } from "../../../models";
import Book from "../../books/models/Book";
import Comment from "../../comments/models/Comment";
import { GodComment } from "../../comments/models/GodComment";
import ReviewReaction from "../../reviewreactions/models/ReviewReaction";
import ReviewUpvote from "../../reviewupvotes/models/ReviewUpvote";
import { SafeUser } from "../../users/models/SafeUser";
import User from "../../users/models/User";

export interface GodReview {
  id: string;
  reviewer: SafeUser;
  book: Book;
  reviewUpvotes?: ReviewUpvote[];
  comments?: GodComment[];
  reviewReactions?: ReviewReaction[];
  rating: number;
  body: string;
}

export class RealGodReview implements GodReview {
  readonly id: string;
  reviewer!: SafeUser;
  book!: Book;
  reviewUpvotes?: ReviewUpvote[];
  comments?: GodComment[];
  reviewReactions?: ReviewReaction[];
  readonly rating: number;
  readonly body: string;

  constructor(id: string, rating: number, body: string) {
    this.id = id;
    this.rating = rating;
    this.body = body;
  }

  public async populate() {
    try {
      const review = await ReviewModel.findById(this.id)
        .populate("reviewerId")
        .populate("bookId")
        .populate("reviewUpvoteIds")
        .populate("commentIds")
        .populate("reviewReactionIds")
        .exec();

      if (!review) throw new ReviewNotFound();

      this.reviewer = (review.reviewerId as DocumentType<User>).toSafeUser();
      this.book = review.bookId as DocumentType<Book>;
      this.reviewUpvotes = review.reviewUpvoteIds as DocumentType<ReviewUpvote>[];

      const comments = [];
      for (const comment of review.commentIds as DocumentType<Comment>[]) {
        comments.push(await comment.toGodComment());
      }
      this.comments = comments;

      this.reviewReactions = review.reviewReactionIds as DocumentType<ReviewReaction>[];
    } catch (error) {
      throw error;
    }
  }
}
