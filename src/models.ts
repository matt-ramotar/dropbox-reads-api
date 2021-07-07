import { getModelForClass } from "@typegoose/typegoose";
import Action from "./api/actions/models/Action";
import Author from "./api/authors/models/Author";
import Book from "./api/books/models/Book";
import Bookshelf from "./api/bookshelves/models/Bookshelf";
import BookTag from "./api/booktags/models/BookTag";
import BookTagUpvote from "./api/booktagupvotes/models/BookTagUpvote";
import CommentReaction from "./api/commentreactions/models/CommentReaction";
import Comment from "./api/comments/models/Comment";
import CommentUpvote from "./api/commentupvotes/models/CommentUpvote";
import Reaction from "./api/reactions/models/Reaction";
import ReviewReaction from "./api/reviewreactions/models/ReviewReaction";
import Review from "./api/reviews/models/Review";
import ReviewUpvote from "./api/reviewupvotes/models/ReviewUpvote";
import Role from "./api/roles/models/Role";
import Tag from "./api/tags/models/Tag";
import User from "./api/users/models/User";

export const ActionModel = getModelForClass(Action);
export const AuthorModel = getModelForClass(Author);
export const BookModel = getModelForClass(Book);
export const BookshelfModel = getModelForClass(Bookshelf);
export const BookTagModel = getModelForClass(BookTag);
export const BookTagUpvoteModel = getModelForClass(BookTagUpvote);
export const CommentModel = getModelForClass(Comment);
export const CommentReactionModel = getModelForClass(CommentReaction);
export const CommentUpvoteModel = getModelForClass(CommentUpvote);
export const ReactionModel = getModelForClass(Reaction);
export const ReviewModel = getModelForClass(Review);
export const ReviewReactionModel = getModelForClass(ReviewReaction);
export const ReviewUpvoteModel = getModelForClass(ReviewUpvote);
export const RoleModel = getModelForClass(Role);
export const TagModel = getModelForClass(Tag);
export const UserModel = getModelForClass(User);
