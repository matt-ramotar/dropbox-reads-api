import { SafeUser } from "../models/SafeUser";
import { UserProfile } from "../models/UserProfile";
import addAction from "./addAction";
import addBook from "./addBook";
import addBookshelf from "./addBookshelf";
import addBookTag from "./addBookTag";
import addFollower from "./addFollower";
import addReview from "./addReview";
import followTag from "./followTag";
import followUser from "./followUser";
import getUser from "./getUser";
import getUserProfile from "./getUserProfile";
import publishAction from "./publishAction";
import removeFollower from "./removeFollower";
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
}
