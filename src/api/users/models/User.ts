import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Action from "../../actions/models/Action";
import Book from "../../books/models/Book";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import BookTagUpvote from "../../booktagupvotes/models/BookTagUpvote";
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
  @prop()
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
  @prop({ ref: () => Role, type: () => String })
  role?: Ref<Role, string>;

  @Field()
  @prop()
  isLoggedIn?: boolean;

  @Field()
  @prop()
  googleId!: string;

  @Field(() => [ID])
  @prop({ ref: () => User, type: () => String })
  usersFollowing?: Ref<User, string>[];

  @Field(() => [ID])
  @prop({ ref: () => User, type: () => String })
  usersFollowedBy?: Ref<User, string>[];

  @Field(() => [ID])
  @prop({ ref: () => Tag, type: () => String })
  tagsFollowing?: Ref<Tag, string>[];

  @Field(() => [ID])
  @prop({ ref: () => Bookshelf, type: () => String })
  bookshelves?: Ref<Bookshelf, string>[];

  @Field(() => [ID])
  @prop({ ref: () => Review, type: () => String })
  reviews?: Ref<Review, string>[];

  @Field(() => [ID])
  @prop({ ref: () => ReviewUpvote, type: () => String })
  reviewUpvotes?: Ref<ReviewUpvote, string>[];

  @Field(() => [ID])
  @prop({ ref: () => ReviewReaction, type: () => String })
  reviewReactions?: Ref<ReviewReaction, string>[];

  @Field(() => [ID])
  @prop({ ref: () => Book, type: () => String })
  booksAdded?: Ref<Book, string>[];

  @Field(() => [ID])
  @prop({ ref: () => BookTag, type: () => String })
  bookTagsAdded?: Ref<BookTag, string>[];

  @Field(() => [ID])
  @prop({ ref: () => BookTagUpvote, type: () => String })
  bookTagUpvotes?: Ref<BookTagUpvote, string>[];

  @Field(() => [ID])
  @prop({ ref: () => Action, type: () => String })
  actions?: Ref<Action, string>[];

  @Field(() => [ID])
  @prop({ ref: () => Action, type: () => String })
  feed?: Ref<Action, string>[];

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

  public async publishAction(this: DocumentType<User>, actionId: string) {
    await this.populate("usersFollowedBy")
      .execPopulate()
      .then((user: DocumentType<User>) => user.usersFollowing as DocumentType<User>[])
      .then((followers: DocumentType<User>[]) =>
        followers.forEach((follower: DocumentType<User>) => {
          if (follower.feed) follower.feed.push(actionId);
          else follower.feed = [actionId];
          follower.save();
        })
      );
  }
}
