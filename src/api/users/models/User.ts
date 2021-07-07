import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import ReviewReaction from "../../reviewreactions/models/ReviewReaction";
import Review from "../../reviews/models/Review";
import ReviewUpvote from "../../reviewupvotes/models/ReviewUpvote";
import Role from "../../roles/models/Role";
import Tag from "../../tags/models/Tag";
import { RealSafeUser, SafeUser } from "./SafeUser";
import { RealUserProfile, UserProfile } from "./UserProfile";

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

  @Field(() => ID)
  @prop({ ref: () => Role })
  role?: Ref<Role, string>;

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

  @Field(() => ID)
  @prop({ ref: () => Tag })
  tagsFollowing?: Ref<Tag, string>[];

  @Field(() => ID)
  @prop({ ref: () => Bookshelf })
  bookshelves?: Ref<Bookshelf, string>[];

  @Field(() => ID)
  @prop({ ref: () => Review })
  reviews?: Ref<Review, string>[];

  @Field(() => ID)
  @prop({ ref: () => ReviewUpvote })
  reviewUpvotes?: Ref<ReviewUpvote, string>[];

  @Field(() => ID)
  @prop({ ref: () => ReviewReaction })
  reviewReactions?: Ref<ReviewReaction, string>[];

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

  public toUserProfile(this: DocumentType<User>): UserProfile {
    return new RealUserProfile(this.toSafeUser());
  }
}
