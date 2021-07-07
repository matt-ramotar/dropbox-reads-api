import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import ReviewReaction from "../../reviewreactions/models/ReviewReaction";
import Review from "../../reviews/models/Review";
import Tag from "../../tags/models/Tag";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Action model" })
export default class Action {
  @Field(() => ID)
  @prop({ ref: () => Action })
  id!: string;

  @Field()
  @prop()
  type!: ActionType;

  @Field()
  @prop()
  datetime!: Date;

  @Field(() => ID)
  @prop({ ref: () => User })
  user!: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => User })
  otherUser?: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => Book })
  book?: Ref<Book, string>;

  @Field(() => ID)
  @prop({ ref: () => Bookshelf })
  bookshelf?: Ref<Bookshelf, string>;

  @Field(() => ID)
  @prop({ ref: () => BookTag })
  bookTag?: Ref<BookTag, string>;

  @Field(() => ID)
  @prop({ ref: () => Tag })
  tag?: Ref<Tag, string>;

  @Field(() => ID)
  @prop({ ref: () => Review })
  review?: Ref<Review, string>;

  @Field(() => ID)
  @prop({ ref: () => Comment })
  comment?: Ref<Comment, string>;

  @Field(() => ID)
  @prop({ ref: () => ReviewReaction })
  reviewReaction?: Ref<ReviewReaction, string>;

  @Field(() => ID)
  @prop({ ref: () => CommentReaction })
  commentReaction?: Ref<CommentReaction, string>;
}
