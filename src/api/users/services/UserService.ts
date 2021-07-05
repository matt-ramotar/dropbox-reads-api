import { SafeUser } from "../models/SafeUser";
import { UserProfile } from "../models/UserProfile";
import followUser from "./followUser";
import getUser from "./getUser";
import getUserProfile from "./getUserProfile";
import unfollowUser from "./unfollowUser";

interface UserService {
  getUser(userId: string): Promise<SafeUser | null>;
  getUserProfile(username: string): Promise<UserProfile | null>;
  followOtherUser(userId: string, otherUserId: string): Promise<SafeUser | null>;
  unfollowOtherUser(userId: string, otherUserId: string): Promise<SafeUser | null>;
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
}
