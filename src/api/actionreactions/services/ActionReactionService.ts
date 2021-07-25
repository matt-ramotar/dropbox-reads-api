import { GodActionReaction } from "../models/GodActionReaction";
import createActionReaction from "./createActionReaction";

interface ActionReactionService {
  createActionReaction(actionId: string, userId: string, reactionId: string): Promise<GodActionReaction>;
}

export default class RealActionReactionService implements ActionReactionService {
  public async createActionReaction(actionId: string, userId: string, reactionId: string): Promise<GodActionReaction> {
    return await createActionReaction(actionId, userId, reactionId);
  }
}
