import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "BookTagUpvote model" })
export default class BookTagUpvote {
  @Field(() => ID)
  @prop({ ref: () => BookTagUpvote })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => BookTag })
  bookTag!: Ref<BookTag, string>;

  @Field(() => ID)
  @prop({ ref: () => User })
  upvoter!: Ref<User, string>;
}
