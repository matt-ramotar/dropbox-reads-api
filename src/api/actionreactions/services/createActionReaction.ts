import { ActionReactionModel } from "../../../models";
import { GodActionReaction } from "../models/GodActionReaction";

export default async function createActionReaction(actionId: string, userId: string, reactionId: string): Promise<GodActionReaction> {
  try {
    const actionReaction = await ActionReactionModel.create({
      actionId,
      userId,
      reactionId
    });

    return await actionReaction.toGodActionReaction();
  } catch (error) {
    throw error;
  }
}
