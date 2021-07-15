import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { default as Review, default as User } from "../../reviews/models/Review";

/**
 * @tsoaModel
 */

@ObjectType({ description: "ReviewUpvote model" })
export default class ReviewUpvote {
  @Field(() => ID)
  @prop({ ref: () => ReviewUpvote })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Review })
  reviewId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;

  public async toPojo(this: DocumentType<ReviewUpvote>): Promise<ReviewUpvote> {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
