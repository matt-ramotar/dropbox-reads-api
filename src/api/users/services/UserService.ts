import { SafeUser } from "../models/SafeUser";
import { UserProfile } from "../models/UserProfile";
import addAction from "./addAction";
import addBook from "./addBook";
import addBookshelf from "./addBookshelf";
import addBookTag from "./addBookTag";
import addReview from "./addReview";
import followUser from "./followUser";
import getUser from "./getUser";
import getUserProfile from "./getUserProfile";
import publishAction from "./publishAction";
import unfollowUser from "./unfollowUser";

interface UserService {
  getUser(userId: string): Promise<SafeUser | null>;
  getUserProfile(username: string): Promise<UserProfile | null>;
  followOtherUser(userId: string, otherUserId: string): Promise<SafeUser | null>;
  unfollowOtherUser(userId: string, otherUserId: string): Promise<SafeUser | null>;
  addBookshelf(userId: string, bookshelfId: string): Promise<SafeUser | null>;
  addAction(actionId: string, userId: string): Promise<void>;
  publishAction(userId: string, actionId: string): Promise<void>;
  addBookTag(bookTagId: string, userId: string): Promise<void>;
  addBook(bookId: string, userId: string): Promise<void>;
  addReview(reviewId: string, reviewerId: string): Promise<void>;
}

export default class RealUserService implements UserService {
  public async getUser(userId: string): Promise<SafeUser | null> {
    return await getUser(userId);
  }

  public async getUserProfile(username: string): Promise<UserProfile | null> {
    return await getUserProfile(username);
  }

  public async followOtherUser(userId: string, otherUserId: string): Promise<SafeUser | null> {
    return await followUser(userId, otherUserId);
  }

  public async unfollowOtherUser(userId: string, otherUserId: string): Promise<SafeUser | null> {
    return await unfollowUser(userId, otherUserId);
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
}
