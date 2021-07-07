import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Author from "../../authors/models/Author";
import Tag from "../../tags/models/Tag";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Book model" })
export default class Book {
  @Field(() => ID)
  @prop({ ref: () => Book })
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
  @prop({ ref: () => Author })
  author!: Ref<Author, string>;

  @Field(() => ID)
  @prop({ ref: () => Tag })
  tags?: Ref<Tag, string>[];

  @Field(() => ID)
  @prop({ ref: () => User })
  userAddedBy!: Ref<User, string>;
}
