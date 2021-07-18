import { DocumentType } from "@typegoose/typegoose";
import BookUpvote from "src/api/bookupvotes/models/BookUpvote";
import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";
import Action from "../../actions/models/Action";
import Book from "../../books/models/Book";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import BookTagUpvote from "../../booktagupvotes/models/BookTagUpvote";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import Comment from "../../comments/models/Comment";
import CommentUpvote from "../../commentupvotes/models/CommentUpvote";
import ReviewReaction from "../../reviewreactions/models/ReviewReaction";
import Review from "../../reviews/models/Review";
import ReviewUpvote from "../../reviewupvotes/models/ReviewUpvote";
import Role from "../../roles/models/Role";
import Tag from "../../tags/models/Tag";
import { SafeUser } from "./SafeUser";
import User from "./User";

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
  bookUpvotes?: BookUpvote[];
  commentUpvotes?: CommentUpvote[];
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
  bookUpvotes?: BookUpvote[];
  commentUpvotes?: CommentUpvote[];

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

  public async populate() {
    try {
      const user = await UserModel.findById(this.id)
        .populate("roleId")
        .populate("usersFollowingIds")
        .populate("usersFollowedByIds")
        .populate("tagsFollowingIds")
        .populate("bookshelfIds")
        .populate("reviewIds")
        .populate("commentIds")
        .populate("reviewUpvoteIds")
        .populate("commentUpvoteIds")
        .populate("reviewReactionIds")
        .populate("commentReactionIds")
        .populate("booksAddedIds")
        .populate("bookTagsAddedIds")
        .populate("bookTagUpvoteIds")
        .populate("actionIds")
        .populate("bookUpvoteIds")
        .exec();

      if (!user) throw new UserNotFound();

      this.role = user.roleId ? (user.roleId as DocumentType<Role>).toPojo() : undefined;
      this.usersFollowing = (user.usersFollowingIds as DocumentType<User>[]).map((user) => user.toSafeUser());
      this.usersFollowedBy = (user.usersFollowedByIds as DocumentType<User>[]).map((user) => user.toSafeUser());
      this.tagsFollowing = (user.tagsFollowingIds as DocumentType<Tag>[]).map((tag) => tag.toPojo());
      this.bookshelves = (user.bookshelfIds as DocumentType<Bookshelf>[]).map((bookshelf) => bookshelf.toPojo());
      this.reviews = (user.reviewIds as DocumentType<Review>[]).map((review) => review.toPojo());
      this.comments = (user.commentIds as DocumentType<Comment>[]).map((comment) => comment.toPojo());
      this.reviewUpvotes = (user.reviewUpvoteIds as DocumentType<ReviewUpvote>[]).map((upvote) => upvote.toPojo());
      this.commentUpvotes = (user.commentUpvoteIds as DocumentType<CommentUpvote>[]).map((upvote) => upvote.toPojo());
      this.booksAdded = (user.booksAddedIds as DocumentType<Book>[]).map((book) => book.toPojo());
      this.bookTagsAdded = (user.bookTagsAddedIds as DocumentType<BookTag>[]).map((bookTag) => bookTag.toPojo());
      this.actions = (user.actionIds as DocumentType<Action>[]).map((action) => action.toPojo());
      this.bookUpvotes = (user.bookUpvoteIds as DocumentType<BookUpvote>[]).map((upvote) => upvote.toPojo());
    } catch (error) {
      throw error;
    }
  }
}
