import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Author from "../../authors/models/Author";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import Review from "../../reviews/models/Review";
import User from "../../users/models/User";
import { GodBook, RealGodBook } from "./GodBook";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Book model" })
export default class Book {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field()
  @prop({ unique: true })
  googleId?: string;

  @Field()
  @prop()
  title!: string;

  @Field()
  @prop()
  coverImage?: string;

  @Field(() => ID)
  @prop({ ref: () => Author })
  authorId!: string;

  @Field(() => [ID])
  @prop({ ref: () => BookTag })
  bookTagIds?: string[];

  @Field(() => ID)
  @prop({ ref: () => User })
  userAddedById!: string;

  @Field(() => [ID])
  @prop({ ref: () => Bookshelf })
  bookshelfIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => Review })
  reviewIds?: string[];

  public async toGodBook(this: DocumentType<Book>): Promise<GodBook> {
    const godBook = new RealGodBook(this._id, this.title, this.googleId, this.coverImage);

    await godBook.populate({
      authorId: this.authorId,
      bookTagIds: this.bookTagIds,
      userAddedById: this.userAddedById,
      bookshelfIds: this.bookshelfIds,
      reviewIds: this.reviewIds
    });

    return godBook;
  }
}
