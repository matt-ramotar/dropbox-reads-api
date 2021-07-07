import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import Tag from "../../tags/models/Tag";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Bookshelf model" })
export default class Bookshelf {
  @Field(() => ID)
  @prop({ ref: () => Bookshelf })
  id!: string;

  @Field()
  @prop()
  name!: string;

  @Field()
  @prop()
  description!: string;

  @Field(() => ID)
  @prop({ ref: () => Book })
  books?: Ref<Book, string>[];

  @Field(() => ID)
  @prop({ ref: () => User })
  owner!: Ref<User, string>;

  @Field(() => ID)
  @prop({ ref: () => Tag })
  tags?: Ref<Tag, string>[];
}
