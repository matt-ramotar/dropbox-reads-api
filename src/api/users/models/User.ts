import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Action from "../../actions/models/Action";
import Book from "../../books/models/Book";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookTag from "../../booktags/models/BookTag";
import BookTagUpvote from "../../booktagupvotes/models/BookTagUpvote";
import CommentReaction from "../../commentreactions/models/CommentReaction";
import Comment from "../../comments/models/Comment";
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
  @prop({ ref: () => Role })
  roleId?: string;

  @Field()
  @prop()
  isLoggedIn?: boolean;

  @Field()
  @prop()
  googleId!: string;

  @Field(() => [ID])
  @prop({ ref: () => User })
  usersFollowingIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => User })
  usersFollowedByIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => Tag })
  tagsFollowingIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => Bookshelf })
  bookshelfIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => Review })
  reviewIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => Comment })
  commentIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => ReviewUpvote })
  reviewUpvoteIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => ReviewReaction })
  reviewReactionIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => CommentReaction })
  commentReactionIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => Book })
  booksAddedIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => BookTag })
  bookTagsAddedIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => BookTagUpvote })
  bookTagUpvoteIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => Action })
  actionIds?: string[];

  @Field(() => [ID])
  @prop({ ref: () => Action })
  feed?: string[];

  public toSafeUser(this: DocumentType<User>): SafeUser {
    return new RealSafeUser(this._id, this.firstName, this.lastName, this.email, this.username, this.picture, this.isLoggedIn);
  }

  public toUserProfile(this: DocumentType<User>): UserProfile {
    return new RealUserProfile(this.toSafeUser());
  }

  public async publishAction(this: DocumentType<User>, actionId: string) {
    await this.populate("usersFollowedByIds")
      .execPopulate()
      .then((user: DocumentType<User>) => user.usersFollowedByIds as DocumentType<User>[])
      .then((followers: DocumentType<User>[]) =>
        followers.forEach((follower: DocumentType<User>) => {
          if (follower.feed) follower.feed.push(actionId);
          else follower.feed = [actionId];
          follower.save();
        })
      );
  }
}
