import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";

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
  @prop({ ref: () => Book, type: () => String })
  books?: Ref<Book, string>[];
}
