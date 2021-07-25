import { ActionNotFound, ActionReactionNotFound, RelationshipAlreadyExists } from "../../../errors";
import isIn from "../../../helpers/isIn";
import { ActionModel, ActionReactionModel } from "../../../models";

export default async function addActionReaction(actionId: string, actionReactionId: string): Promise<void> {
  try {
    const action = await ActionModel.findById(actionId);
    if (!action) throw new ActionNotFound();

    const actionReaction = await ActionReactionModel.findById(actionReactionId);
    if (!actionReaction) throw new ActionReactionNotFound();

    if (isIn(actionReactionId, action.actionReactionIds)) throw new RelationshipAlreadyExists();

    if (action.actionReactionIds) action.actionReactionIds.push(actionReactionId);
    else action.actionReactionIds = [actionReactionId];
    await action.save();
  } catch (error) {
    throw error;
  }
}
