import { getModelForClass } from "@typegoose/typegoose";
import Author from "./api/authors/models/Author";
import Book from "./api/books/models/Book";
import Tag from "./api/tags/models/Tag";
import User from "./api/users/models/User";

export const AuthorModel = getModelForClass(Author);
export const BookModel = getModelForClass(Book);
export const TagModel = getModelForClass(Tag);
export const UserModel = getModelForClass(User);
