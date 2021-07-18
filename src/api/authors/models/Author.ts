import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Author model" })
export default class Author {
  @Field(() => ID)
  @prop({ ref: () => Author })
  id!: string;

  @Field()
  @prop()
  firstName!: string;

  @Field()
  @prop()
  lastName!: string;

  public toPojo(this: DocumentType<Author>): Author {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
