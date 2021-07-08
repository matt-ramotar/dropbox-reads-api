import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

/**
 * @tsoaModel
 */

@ObjectType({ description: "BookTag model" })
export default class BookTag {
  @Field(() => ID)
  @prop()
  id!: string;

  // @Field(() => ID)
  // @prop({ ref: () => Book })
  // book!: Ref<Book, string>;

  // @Field(() => ID)
  // @prop({ ref: () => Tag })
  // tag!: Ref<Tag, string>;

  // @Field(() => ID)
  // @prop({ ref: () => User })
  // userAddedBy!: Ref<User, string>;

  // @Field(() => ID)
  // @prop({ ref: () => BookTagUpvote })
  // upvotes?: Ref<BookTagUpvote, string>[];
}
