import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Author from "../../authors/models/Author";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import Review from "../../reviews/models/Review";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Book model" })
export default class Book {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field()
  @prop()
  googleId!: string;

  @Field()
  @prop()
  title!: string;

  @Field()
  @prop()
  coverImage?: string;

  @Field(() => ID)
  @prop({ ref: () => Author, type: () => String })
  author!: Ref<Author, string>;

  @Field(() => [ID])
  @prop({ ref: () => BookTag })
  tags?: Ref<BookTag, string>[];

  @Field(() => ID)
  @prop({ ref: () => User, type: () => String })
  userAddedBy!: string;

  @Field(() => [ID])
  @prop({ ref: () => Bookshelf, type: () => String })
  bookshelves?: Ref<Bookshelf, string>[];

  @Field(() => [ID])
  @prop({ ref: () => Review, type: () => String })
  reviews?: string[];
}
