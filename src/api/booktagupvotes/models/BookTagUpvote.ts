import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import BookTag from "../../booktags/models/BookTag";
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
  bookTagId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;

  public toPojo(this: DocumentType<BookTagUpvote>): BookTagUpvote {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
