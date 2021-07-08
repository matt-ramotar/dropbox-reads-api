import { DocumentType } from "@typegoose/typegoose";
import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";
import User from "../models/User";

export default async function publishAction(actionId: string, userId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw UserNotFound;

    await user
      .populate("usersFollowedBy")
      .execPopulate()
      .then((user: DocumentType<User>) => user.usersFollowing as DocumentType<User>[])
      .then((followers: DocumentType<User>[]) =>
        followers.forEach((follower: DocumentType<User>) => {
          if (follower.feed) follower.feed.push(actionId);
          else follower.feed = [actionId];
          follower.save();
        })
      );
  } catch (error) {
    throw error;
  }
}
