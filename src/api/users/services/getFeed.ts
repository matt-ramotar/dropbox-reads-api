import { UserNotFound } from "../../../errors";
import { ActionModel, UserModel } from "../../../models";
import { Feed, RealFeed } from "../../actions/models/Feed";

export default async function getFeed(userId: string, offset: number): Promise<Feed> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    if (!user.feed) throw new Error("Feed is empty");
    const actionIds = user.feed.slice(offset - 1, offset + 9);

    const godActions = [];
    for (const actionId of actionIds) {
      const action = await ActionModel.findById(actionId);

      if (!action) continue;

      godActions.push(await action.toGodAction());
    }

    return new RealFeed(godActions);
  } catch (error) {
    throw error;
  }
}
