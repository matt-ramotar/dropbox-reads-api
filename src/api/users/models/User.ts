import { DocumentType, pre, prop, Ref } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { Field, ID, ObjectType } from "type-graphql";
import { RealSafeUser, SafeUser } from "./SafeUser";

/**
 * @tsoaModel
 */

@pre<User>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
})
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
  password!: string;

  @Field()
  @prop()
  isLoggedIn?: boolean;

  @Field(() => ID)
  @prop({ ref: () => User })
  usersFollowing?: Ref<User, string>[];

  @Field(() => ID)
  @prop({ ref: () => User })
  usersFollowedBy?: Ref<User, string>[];

  public async comparePassword(this: DocumentType<User>, candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }

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
