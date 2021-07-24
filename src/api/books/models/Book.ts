import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Author from "../../authors/models/Author";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import BookUpvote from "../../bookupvotes/models/BookUpvote";
import Comment from "../../comments/models/Comment";
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

  @Field()
  @prop()
  description!: string;

  @Field()
  @prop()
  authorId?: string;

  @Field(() => [ID])
  @prop({ ref: () => Author })
  authorIds!: string[];

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

  @Field(() => [ID])
  @prop({ ref: () => BookUpvote })
  bookUpvoteIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => Comment })
  bookCommentIds?: string[];

  public async toGodBook(this: DocumentType<Book>): Promise<GodBook> {
    const godBook = new RealGodBook(this._id, this.title, this.description, this.googleId, this.coverImage);

    await godBook.populate({
      authorIds: this.authorIds,
      bookTagIds: this.bookTagIds,
      userAddedById: this.userAddedById,
      bookshelfIds: this.bookshelfIds,
      reviewIds: this.reviewIds,
      bookUpvoteIds: this.bookUpvoteIds,
      bookCommentIds: this.bookCommentIds
    });

    return godBook;
  }

  public toPojo(this: DocumentType<Book>): Book {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
