import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../../models";
import { KEYS } from "../../../util/secrets";
import RealBookshelfService from "../../bookshelves/services/BookshelfService";
import RealUserService from "../../users/services/UserService";
import { ContinueWithGoogleSuccess } from "../entities/responses";

export default async function continueWithGoogle(
  request: Request,
  response: Response,
  _: NextFunction
): Promise<Response<ContinueWithGoogleSuccess>> {
  const { firstName, lastName, username, email, googleId, picture } = request.body;

  const userService = new RealUserService();
  const bookshelfService = new RealBookshelfService();

  let user = await UserModel.findOne({ username });

  if (!user) {
    user = await userService.createUser(firstName, lastName, username, email, googleId, picture);
    const name = "Recommendations";
    const description = `${firstName}'s Recommendations`;
    const bookshelf = await bookshelfService.createBookshelf(name, description, user._id);
    await userService.addBookshelf(user._id, bookshelf.id);
  }

  user.isLoggedIn = true;
  await user.save();

  const token = jwt.sign({ userId: user._id }, KEYS!);

  return response.json(new ContinueWithGoogleSuccess(user.toSafeUser(), token));
}
