import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import Action from "../../actions/models/Action";
import Reaction from "../../reactions/models/Reaction";
import User from "../../users/models/User";
import { GodActionReaction, RealGodActionReaction } from "./GodActionReaction";

/**
 * @tsoaModel
 */

@ObjectType({ description: "Action reaction model" })
export default class ActionReaction {
  @Field(() => ID)
  @prop({ ref: () => ActionReaction })
  id!: string;

  @Field(() => ID)
  @prop({ ref: () => Action })
  actionId!: string;

  @Field(() => ID)
  @prop({ ref: () => User })
  userId!: string;

  @Field(() => ID)
  @prop({ ref: () => Reaction })
  reactionId!: string;

  public async toGodActionReaction(this: DocumentType<ActionReaction>): Promise<GodActionReaction> {
    const godActionReaction = new RealGodActionReaction(this._id);
    await godActionReaction.populate();
    return godActionReaction;
  }

  public toPojo(this: DocumentType<ActionReaction>): ActionReaction {
    const pojo = this.toObject();
    pojo.id = pojo._id;
    delete pojo._id;
    return pojo;
  }
}
