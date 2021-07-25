import { ActionReactionNotFound, UserNotFound } from "../../../errors";
import { ActionReactionModel, UserModel } from "../../../models";

export default async function addActionReaction(userId: string, actionReactionId: string): Promise<void> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const actionReaction = await ActionReactionModel.findById(actionReactionId);
    if (!actionReaction) throw new ActionReactionNotFound();

    if (user.actionReactionIds) user.actionReactionIds.push(actionReactionId);
    else user.actionReactionIds = [actionReactionId];

    await user.save();
  } catch (error) {
    throw error;
  }
}
