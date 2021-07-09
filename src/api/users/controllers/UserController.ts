import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import RealTagService from "../../tags/services/TagService";
import { FollowTagInput } from "../entities/FollowTagInput";
import { FollowUserInput } from "../entities/FollowUserInput";
import { UnfollowTagInput } from "../entities/UnfollowTagInput";
import { UnfollowUserInput } from "../entities/UnfollowUserInput";
import { SafeUser } from "../models/SafeUser";
import { UserProfile } from "../models/UserProfile";
import RealUserService from "../services/UserService";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  /** Get user by ID */
  @Get("{userId}")
  async getUser(@Path() userId: string): Promise<SafeUser | null> {
    return await new RealUserService().getUser(userId);
  }

  /** Get user profile by username */
  @Get("{username}/profile")
  async getUserProfile(@Path() username: string): Promise<UserProfile | null> {
    return await new RealUserService().getUserProfile(username);
  }

  /** Follow user */
  @Post("{userId}/users/following")
  async followUser(@Path() userId: string, @Body() input: FollowUserInput): Promise<void> {
    const { userToFollowId } = input;
    const userService = new RealUserService();

    await userService.followUser(userId, userToFollowId);
    await userService.addFollower(userToFollowId, userId);

    const action = await new RealActionService().createAction({
      type: ActionType.FollowUser,
      userId,
      otherUserId: userToFollowId
    });

    await userService.addAction(action.id, userId);
    await userService.publishAction(action.id, userId);
  }

  /** Unfollow user */
  @Delete("{userId}/users/following")
  async unfollowUser(@Path() userId: string, @Body() input: UnfollowUserInput): Promise<void> {
    const { userToUnfollowId } = input;

    const userService = new RealUserService();

    await userService.unfollowUser(userId, userToUnfollowId);
    await userService.removeFollower(userToUnfollowId, userId);
  }

  /** Follow tag */
  @Post("{userId}/tags/following")
  async followTag(@Path() userId: string, @Body() input: FollowTagInput): Promise<void> {
    const { tagId } = input;

    const userService = new RealUserService();

    await userService.followTag(userId, tagId);
    await new RealTagService().addUser(tagId, userId);

    const action = await new RealActionService().createAction({
      type: ActionType.FollowTag,
      userId,
      tagId
    });

    await userService.addAction(action.id, userId);
    await userService.publishAction(action.id, userId);
  }

  /** Unfollow tag */
  @Delete("{userId}/tags/following")
  async unfollowTag(@Path() userId: string, @Body() input: UnfollowTagInput): Promise<void> {
    const { tagId } = input;

    await new RealUserService().unfollowTag(userId, tagId);
    await new RealTagService().removeUser(tagId, userId);
  }
}
