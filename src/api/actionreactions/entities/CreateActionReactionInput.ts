import { UpsertReactionInput } from "../../reactions/entities/UpsertReactionInput";

export interface CreateActionReactionInput {
  actionId: string;
  userId: string;
  reaction: UpsertReactionInput;
}
