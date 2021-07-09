import { TagNotFound, UserNotFound } from "../../../errors";
import { TagModel, UserModel } from "../../../models";

export default async function addUser(tagId: string, userId: string): Promise<void> {
  try {
    const tag = await TagModel.findById(tagId);
    if (!tag) throw new TagNotFound();

    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    if (tag.users) tag.users.push(userId);
    else tag.users = [userId];

    await tag.save();
  } catch (error) {
    throw error;
  }
}
