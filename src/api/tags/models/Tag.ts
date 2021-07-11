import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import User from "../../users/models/User";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Tag model" })
export default class Tag {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field()
  @prop()
  tag!: string;

  @Field(() => [ID])
  @prop({ ref: () => Book })
  bookIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => User })
  userIds?: string[];
}
