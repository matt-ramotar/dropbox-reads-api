import { DocumentType } from "@typegoose/typegoose";
import { ActionReactionNotFound } from "../../../errors";
import { ActionReactionModel } from "../../../models";
import Action from "../../actions/models/Action";
import Reaction from "../../reactions/models/Reaction";
import { SafeUser } from "../../users/models/SafeUser";
import User from "../../users/models/User";

export interface GodActionReaction {
  id: string;
  action: Action;
  user: SafeUser;
  reaction: Reaction;
}

export class RealGodActionReaction implements GodActionReaction {
  readonly id: string;
  action!: Action;
  user!: SafeUser;
  reaction!: Reaction;

  constructor(id: string) {
    this.id = id;
  }

  public async populate() {
    try {
      const actionReaction = await ActionReactionModel.findById(this.id).populate("actionId").populate("userId").populate("reactionId").exec();
      if (!actionReaction) throw new ActionReactionNotFound();

      this.action = actionReaction.actionId as DocumentType<Action>;
      this.user = (actionReaction.userId as DocumentType<User>).toSafeUser();
      this.reaction = actionReaction.reactionId as DocumentType<Reaction>;
    } catch (error) {
      throw error;
    }
  }
}
