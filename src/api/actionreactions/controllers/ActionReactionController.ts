import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealReactionService from "../../reactions/services/ReactionService";
import RealUserService from "../../users/services/UserService";
import { CreateActionReactionInput } from "../entities/CreateActionReactionInput";
import { GodActionReaction } from "../models/GodActionReaction";
import RealActionReactionService from "../services/ActionReactionService";

@Route("actionreactions")
@Tags("ActionReaction")
export class ActionReactionController extends Controller {
  /** React to action */
  @Post()
  async createActionReaction(@Body() input: CreateActionReactionInput): Promise<GodActionReaction> {
    console.log(input);
    const { actionId, userId, reaction: reactionInput } = input;

    const actionService = new RealActionService();
    const reactionService = new RealReactionService();
    const actionReactionService = new RealActionReactionService();
    const userService = new RealUserService();

    const reaction = await reactionService.upsertReaction(reactionInput);
    const actionReaction = await actionReactionService.createActionReaction(actionId, userId, reaction.id);

    const action = await actionService.createAction({
      type: ActionType.ReactToAction,
      userId,
      actionReactionId: actionReaction.id
    });

    await actionService.addActionReaction(actionId, actionReaction.id);
    await userService.addActionReaction(userId, actionReaction.id);

    await userService.addAction(action.id, userId);
    await userService.publishAction(action.id, userId);

    return actionReaction;
  }
}
