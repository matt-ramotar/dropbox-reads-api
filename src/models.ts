import { getModelForClass } from "@typegoose/typegoose";
import Author from "./api/authors/models/Author";
import User from "./api/users/models/User";

export const AuthorModel = getModelForClass(Author);
export const UserModel = getModelForClass(User);
