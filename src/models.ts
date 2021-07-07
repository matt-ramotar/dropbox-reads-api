import { getModelForClass } from "@typegoose/typegoose";
import Author from "./api/authors/models/Author";
import Book from "./api/books/models/Book";
import User from "./api/users/models/User";

export const AuthorModel = getModelForClass(Author);
export const BookModel = getModelForClass(Book);
export const UserModel = getModelForClass(User);
