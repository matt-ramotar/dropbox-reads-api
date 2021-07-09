import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { ActionType } from "../../actions/models/ActionType";
import RealActionService from "../../actions/services/ActionService";
import { FollowUserInput } from "../entities/FollowUserInput";
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
  @Post("{userId}/following")
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
}
