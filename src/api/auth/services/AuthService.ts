import { NextFunction, Request, Response } from "express";
import { ContinueWithGoogleSuccess } from "../entities/responses";
import continueWithGoogle from "./continueWithGoogle";

interface AuthService {
  continueWithGoogle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<ContinueWithGoogleSuccess>>;
}

export default class RealAuthService implements AuthService {
  public async continueWithGoogle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<ContinueWithGoogleSuccess>> {
    return await continueWithGoogle(request, response, next);
  }
}
