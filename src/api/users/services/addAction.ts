import { UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function addAction(actionId: string, userId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw UserNotFound;

    if (user.actions) user.actions.push(actionId);
    else user.actions = [actionId];
    await user.save();
  } catch (error) {
    throw error;
  }
}
