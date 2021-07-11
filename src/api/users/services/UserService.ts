import { Feed } from "../../actions/models/Feed";
import { GodUser } from "../models/GodUser";
import { SafeUser } from "../models/SafeUser";
import { UserProfile } from "../models/UserProfile";
import addAction from "./addAction";
import addBook from "./addBook";
import addBookshelf from "./addBookshelf";
import addBookTag from "./addBookTag";
import addComment from "./addComment";
import addCommentReaction from "./addCommentReaction";
import addFollower from "./addFollower";
import addReview from "./addReview";
import addReviewReaction from "./addReviewReaction";
import addReviewUpvote from "./addReviewUpvote";
import followTag from "./followTag";
import followUser from "./followUser";
import getFeed from "./getFeed";
import getGodUser from "./getGodUser";
import getUser from "./getUser";
import getUserProfile from "./getUserProfile";
import publishAction from "./publishAction";
import removeFollower from "./removeFollower";
import unfollowTag from "./unfollowTag";
import unfollowUser from "./unfollowUser";

interface UserService {
  getUser(userId: string): Promise<SafeUser | null>;
  getUserProfile(username: string): Promise<UserProfile | null>;
  followUser(userId: string, userToFollowId: string): Promise<void>;
  addFollower(userId: string, followerId: string): Promise<void>;
  unfollowUser(userId: string, userToUnfollowId: string): Promise<void>;
  removeFollower(userId: string, followerId: string): Promise<void>;
  addBookshelf(userId: string, bookshelfId: string): Promise<SafeUser | null>;
  addAction(actionId: string, userId: string): Promise<void>;
  publishAction(userId: string, actionId: string): Promise<void>;
  addBookTag(bookTagId: string, userId: string): Promise<void>;
  addBook(bookId: string, userId: string): Promise<void>;
  addReview(reviewId: string, reviewerId: string): Promise<void>;
  followTag(userId: string, tagId: string): Promise<void>;
  unfollowTag(userId: string, tagId: string): Promise<void>;
  addReviewUpvote(userId: string, reviewUpvoteId: string): Promise<void>;
  addComment(userId: string, commentId: string): Promise<void>;
  addReviewReaction(userId: string, reviewReactionId: string): Promise<void>;
  addCommentReaction(userId: string, commentReactionId: string): Promise<void>;
  getFeed(userId: string, offset: number): Promise<Feed>;
  getGodUser(userId: string): Promise<GodUser>;
}

export default class RealUserService implements UserService {
  public async getUser(userId: string): Promise<SafeUser | null> {
    return await getUser(userId);
  }

  public async getUserProfile(username: string): Promise<UserProfile | null> {
    return await getUserProfile(username);
  }

  public async followUser(userId: string, userToFollowId: string): Promise<void> {
    return await followUser(userId, userToFollowId);
  }

  public async addFollower(userId: string, followerId: string): Promise<void> {
    return await addFollower(userId, followerId);
  }

  public async unfollowUser(userId: string, userToUnfollowId: string): Promise<void> {
    return await unfollowUser(userId, userToUnfollowId);
  }

  public async removeFollower(userId: string, followerId: string): Promise<void> {
    return await removeFollower(userId, followerId);
  }

  public async addBookshelf(userId: string, bookshelfId: string): Promise<SafeUser | null> {
    return await addBookshelf(userId, bookshelfId);
  }

  public async addAction(actionId: string, userId: string): Promise<void> {
    return await addAction(actionId, userId);
  }

  public async publishAction(actionId: string, userId: string): Promise<void> {
    return await publishAction(actionId, userId);
  }

  public async addBookTag(bookTagId: string, userId: string): Promise<void> {
    return await addBookTag(bookTagId, userId);
  }

  public async addBook(bookId: string, userId: string): Promise<void> {
    return await addBook(bookId, userId);
  }

  public async addReview(reviewId: string, reviewerId: string): Promise<void> {
    return await addReview(reviewId, reviewerId);
  }

  public async followTag(userId: string, tagId: string): Promise<void> {
    return await followTag(userId, tagId);
  }

  public async unfollowTag(userId: string, tagId: string): Promise<void> {
    return await unfollowTag(userId, tagId);
  }

  public async addReviewUpvote(userId: string, reviewUpvoteId: string): Promise<void> {
    return await addReviewUpvote(userId, reviewUpvoteId);
  }

  public async addComment(userId: string, commentId: string): Promise<void> {
    return await addComment(userId, commentId);
  }

  public async addReviewReaction(userId: string, reviewReactionId: string): Promise<void> {
    return await addReviewReaction(userId, reviewReactionId);
  }

  public async addCommentReaction(userId: string, commentReactionId: string): Promise<void> {
    return await addCommentReaction(userId, commentReactionId);
  }

  public async getFeed(userId: string, offset: number): Promise<Feed> {
    return await getFeed(userId, offset);
  }

  public async getGodUser(userId: string): Promise<GodUser> {
    return await getGodUser(userId);
  }
}
