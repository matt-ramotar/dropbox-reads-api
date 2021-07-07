import { getModelForClass } from "@typegoose/typegoose";
import Author from "./api/authors/models/Author";
import Book from "./api/books/models/Book";
import Bookshelf from "./api/bookshelves/models/Bookshelf";
import BookTag from "./api/booktags/models/BookTag";
import BookTagUpvote from "./api/booktagupvotes/models/BookTagUpvote";
import Tag from "./api/tags/models/Tag";
import User from "./api/users/models/User";

export const AuthorModel = getModelForClass(Author);
export const BookModel = getModelForClass(Book);
export const BookshelfModel = getModelForClass(Bookshelf);
export const BookTagModel = getModelForClass(BookTag);
export const BookTagUpvoteModel = getModelForClass(BookTagUpvote);
export const TagModel = getModelForClass(Tag);
export const UserModel = getModelForClass(User);
