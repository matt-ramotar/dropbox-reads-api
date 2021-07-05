import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { RealSafeUser, SafeUser } from "./SafeUser";

/**
 * @tsoaModel
 */

@ObjectType({ description: "User model" })
export default class User {
  @Field(() => ID)
  @prop({ ref: () => User })
  id!: string;

  @Field()
  @prop()
  firstName!: string;

  @Field()
  @prop()
  lastName!: string;

  @Field()
  @prop({ unique: true })
  email!: string;

  @Field()
  @prop({ unique: true })
  username!: string;

  @Field()
  @prop()
  picture?: string;

  @Field()
  @prop()
  isLoggedIn?: boolean;

  @Field()
  @prop()
  googleId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  usersFollowing?: Ref<User, string>[];

  @Field(() => ID)
  @prop({ ref: () => User })
  usersFollowedBy?: Ref<User, string>[];

  public toSafeUser(this: DocumentType<User>): SafeUser {
    return new RealSafeUser(
      this._id,
      this.firstName,
      this.lastName,
      this.email,
      this.username,
      this.picture,
      this.isLoggedIn
    );
  }
}
