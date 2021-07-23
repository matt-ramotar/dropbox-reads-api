import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import User from "../../users/models/User";

@ObjectType({ description: "BookshelfBook model" })
export default class BookshelfBook {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Bookshelf })
  bookshelfId!: string;

  @Field(() => ID)
  @prop({ ref: () => Book })
  bookId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;

  @Field()
  @prop()
  reason?: string;
}
