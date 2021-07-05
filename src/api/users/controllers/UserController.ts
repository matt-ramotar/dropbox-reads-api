import { Controller, Get, Path, Route, Tags } from "tsoa";
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
}
