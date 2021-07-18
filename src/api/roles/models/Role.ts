import { DocumentType, prop } from "@typegoose/typegoose";
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

  public toPojo(this: DocumentType<Role>): Role {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
