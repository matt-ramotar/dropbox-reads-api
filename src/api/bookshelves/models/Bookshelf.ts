import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Book from "../../books/models/Book";
import Tag from "../../tags/models/Tag";
import User from "../../users/models/User";
import { GodBookshelf, RealGodBookshelf } from "./GodBookshelf";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Bookshelf model" })
export default class Bookshelf {
  @Field(() => ID)
  @prop()
  id!: string;

  @Field()
  @prop()
  name!: string;

  @Field()
  @prop()
  description!: string;

  @Field(() => ID)
  @prop({ ref: () => Book })
  bookIds?: string[];

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;

  @Field(() => ID)
  @prop({ ref: () => Tag })
  tagIds?: string[];

  public async toGodBookshelf(this: DocumentType<Bookshelf>): Promise<GodBookshelf> {
    const godBookshelf = new RealGodBookshelf(this._id, this.name, this.description);
    await godBookshelf.populate();
    return godBookshelf;
  }

  public async toPojo(this: DocumentType<Bookshelf>): Promise<Bookshelf> {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
