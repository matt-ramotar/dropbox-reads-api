import { RoleNotFound } from "../../../errors";
import {
  ActionModel,
  BookModel,
  BookshelfModel,
  BookTagModel,
  BookTagUpvoteModel,
  CommentModel,
  CommentReactionModel,
  ReviewModel,
  ReviewReactionModel,
  ReviewUpvoteModel,
  RoleModel,
  TagModel,
  UserModel
} from "../../../models";
import Action from "../../actions/models/Action";
import Book from "../../books/models/Book";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import BookTagUpvote from "../../booktagupvotes/models/BookTagUpvote";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import Comment from "../../comments/models/Comment";
import ReviewReaction from "../../reviewreactions/models/ReviewReaction";
import Review from "../../reviews/models/Review";
import ReviewUpvote from "../../reviewupvotes/models/ReviewUpvote";
import Role from "../../roles/models/Role";
import Tag from "../../tags/models/Tag";
import { Refs } from "../entities/Refs";
import { SafeUser } from "./SafeUser";

export interface GodUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  picture?: string;
  role?: Role;
  isLoggedIn?: boolean;
  googleId: string;
  usersFollowing?: SafeUser[];
  usersFollowedBy?: SafeUser[];
  tagsFollowing?: Tag[];
  bookshelves?: Bookshelf[];
  reviews?: Review[];
  comments?: Comment[];
  reviewUpvotes?: ReviewUpvote[];
  reviewReactions?: ReviewReaction[];
  commentReactions?: CommentReaction[];
  booksAdded?: Book[];
  bookTagsAdded?: BookTag[];
  bookTagUpvotes?: BookTagUpvote[];
  actions?: Action[];
}

export class RealGodUser implements GodUser {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly username: string;
  readonly picture?: string;
  readonly isLoggedIn?: boolean;
  readonly googleId: string;
  role?: Role;
  usersFollowing?: SafeUser[];
  usersFollowedBy?: SafeUser[];
  tagsFollowing?: Tag[];
  bookshelves?: Bookshelf[];
  reviews?: Review[];
  comments?: Comment[];
  reviewUpvotes?: ReviewUpvote[];
  reviewReactions?: ReviewReaction[];
  commentReactions?: CommentReaction[];
  booksAdded?: Book[];
  bookTagsAdded?: BookTag[];
  bookTagUpvotes?: BookTagUpvote[];
  actions?: Action[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    googleId: string,
    picture?: string,
    isLoggedIn?: boolean
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.picture = picture;
    this.isLoggedIn = isLoggedIn;
    this.googleId = googleId;
  }

  public async populate(refs: Refs) {
    const {
      roleId,
      usersFollowingIds,
      usersFollowedByIds,
      tagsFollowingIds,
      bookshelfIds,
      reviewIds,
      commentIds,
      reviewUpvoteIds,
      reviewReactionIds,
      commentReactionIds,
      booksAddedIds,
      bookTagsAddedIds,
      bookTagUpvoteIds,
      actionIds
    } = refs;

    if (roleId) await this.setRole(roleId);
    if (usersFollowingIds) await this.setUsersFollowing(usersFollowingIds);
    if (usersFollowedByIds) await this.setUsersFollowedBy(usersFollowedByIds);
    if (tagsFollowingIds) await this.setTagsFollowing(tagsFollowingIds);
    if (bookshelfIds) await this.setBookshelves(bookshelfIds);
    if (reviewIds) await this.setReviews(reviewIds);
    if (commentIds) await this.setComments(commentIds);
    if (reviewUpvoteIds) await this.setReviewUpvotes(reviewUpvoteIds);
    if (reviewReactionIds) await this.setReviewReactions(reviewReactionIds);
    if (commentReactionIds) await this.setCommentReactions(commentReactionIds);
    if (booksAddedIds) await this.setBooksAdded(booksAddedIds);
    if (bookTagsAddedIds) await this.setBookTagsAdded(bookTagsAddedIds);
    if (bookTagUpvoteIds) await this.setBookTagUpvotes(bookTagUpvoteIds);
    if (actionIds) await this.setActions(actionIds);
  }

  private async setRole(id: string): Promise<void> {
    try {
      const role = await RoleModel.findById(id);
      if (!role) throw new RoleNotFound();
      else this.role = role;
    } catch (error) {
      throw error;
    }
  }

  private async setUsersFollowing(ids: string[]): Promise<void> {
    try {
      const users = [];
      for (const id of ids) {
        const user = await UserModel.findById(id);
        if (!user) continue;
        users.push(user.toSafeUser());
      }
      this.usersFollowing = users;
    } catch (error) {
      throw error;
    }
  }

  private async setUsersFollowedBy(ids: string[]): Promise<void> {
    try {
      const users = [];
      for (const id of ids) {
        const user = await UserModel.findById(id);
        if (!user) continue;
        users.push(user.toSafeUser());
      }
      this.usersFollowedBy = users;
    } catch (error) {
      throw error;
    }
  }

  private async setTagsFollowing(ids: string[]): Promise<void> {
    try {
      const tags = [];
      for (const id of ids) {
        const tag = await TagModel.findById(id);
        if (!tag) continue;
        tags.push(tag);
      }
      this.tagsFollowing = tags;
    } catch (error) {
      throw error;
    }
  }

  private async setBookshelves(ids: string[]): Promise<void> {
    try {
      const bookshelves = [];
      for (const id of ids) {
        const bookshelf = await BookshelfModel.findById(id);
        if (!bookshelf) continue;
        bookshelves.push(bookshelf);
      }
      this.bookshelves = bookshelves;
    } catch (error) {
      throw error;
    }
  }

  private async setReviews(ids: string[]): Promise<void> {
    try {
      const reviews = [];
      for (const id of ids) {
        const review = await ReviewModel.findById(id);
        if (!review) continue;
        reviews.push(review);
      }
      this.reviews = reviews;
    } catch (error) {
      throw error;
    }
  }

  private async setComments(ids: string[]): Promise<void> {
    try {
      const comments = [];
      for (const id of ids) {
        const comment = await CommentModel.findById(id);
        if (!comment) continue;
        comments.push(comment);
      }
      this.comments = comments;
    } catch (error) {
      throw error;
    }
  }

  private async setReviewUpvotes(ids: string[]): Promise<void> {
    try {
      const reviewUpvotes = [];
      for (const id of ids) {
        const reviewUpvote = await ReviewUpvoteModel.findById(id);
        if (!reviewUpvote) continue;
        reviewUpvotes.push(reviewUpvote);
      }
      this.reviewUpvotes = reviewUpvotes;
    } catch (error) {
      throw error;
    }
  }

  private async setReviewReactions(ids: string[]): Promise<void> {
    try {
      const reviewReactions = [];
      for (const id of ids) {
        const reviewReaction = await ReviewReactionModel.findById(id);
        if (!reviewReaction) continue;
        reviewReactions.push(reviewReaction);
      }
      this.reviewReactions = reviewReactions;
    } catch (error) {
      throw error;
    }
  }

  private async setCommentReactions(ids: string[]): Promise<void> {
    try {
      const commentReactions = [];
      for (const id of ids) {
        const commentReaction = await CommentReactionModel.findById(id);
        if (!commentReaction) continue;
        commentReactions.push(commentReaction);
      }
      this.commentReactions = commentReactions;
    } catch (error) {
      throw error;
    }
  }

  private async setBooksAdded(ids: string[]): Promise<void> {
    try {
      const booksAdded = [];
      for (const id of ids) {
        const book = await BookModel.findById(id);
        if (!book) continue;
        booksAdded.push(book);
      }
      this.booksAdded = booksAdded;
    } catch (error) {
      throw error;
    }
  }

  private async setBookTagsAdded(ids: string[]): Promise<void> {
    try {
      const bookTagsAdded = [];
      for (const id of ids) {
        const tag = await BookTagModel.findById(id);
        if (!tag) continue;
        bookTagsAdded.push(tag);
      }
      this.bookTagsAdded = bookTagsAdded;
    } catch (error) {
      throw error;
    }
  }

  private async setBookTagUpvotes(ids: string[]): Promise<void> {
    try {
      const bookTagUpvotes = [];
      for (const id of ids) {
        const upvote = await BookTagUpvoteModel.findById(id);
        if (!upvote) continue;
        bookTagUpvotes.push(upvote);
      }
      this.bookTagUpvotes = bookTagUpvotes;
    } catch (error) {
      throw error;
    }
  }

  private async setActions(ids: string[]): Promise<void> {
    try {
      const actions = [];
      for (const id of ids) {
        const action = await ActionModel.findById(id);
        if (!action) continue;
        actions.push(action);
      }
      this.actions = actions;
    } catch (error) {
      throw error;
    }
  }
}
