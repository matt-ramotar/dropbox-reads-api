import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Role model" })
export default class Role {
  @Field(() => ID)
  @prop({ ref: () => Role })
  id!: string;

  @Field()
  @prop()
  role!: string;
}
