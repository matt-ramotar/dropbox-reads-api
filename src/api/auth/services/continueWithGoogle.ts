import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../../models";
import { KEYS } from "../../../util/secrets";
import { ContinueWithGoogleSuccess } from "../entities/responses";

interface ContinueWithGoogleInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  googleId: string;
  picture: string;
}

export default async function continueWithGoogle(
  request: Request,
  response: Response,
  _: NextFunction
): Promise<Response<ContinueWithGoogleSuccess>> {
  const { firstName, lastName, username, email, googleId, picture }: ContinueWithGoogleInput = request.body;

  let user = await UserModel.findOne({ googleId });

  if (!user) {
    user = new UserModel({ firstName, lastName, username, email, googleId, picture });
  }

  user.isLoggedIn = true;
  await user.save();

  const token = jwt.sign({ userId: user._id }, KEYS!);

  return response.json(new ContinueWithGoogleSuccess(user.toSafeUser(), token));
}
