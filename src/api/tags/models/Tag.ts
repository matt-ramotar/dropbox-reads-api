import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

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

  // @Field(() => [ID])
  // @prop({ ref: () => Book })
  // books?: Ref<Book, string>[];
}
