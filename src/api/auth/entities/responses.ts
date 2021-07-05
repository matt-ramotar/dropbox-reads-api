import { SafeUser } from "../../users/models/SafeUser";

export interface SuccessfulAuth {
  user: SafeUser;
  token: string;
}

export class ContinueWithGoogleSuccess implements SuccessfulAuth {
  readonly user: SafeUser;
  readonly token: string;

  constructor(user: SafeUser, token: string) {
    this.user = user;
    this.token = token;
  }
}

export class TokenValidationSuccess implements SuccessfulAuth {
  readonly user: SafeUser;
  readonly token: string;

  constructor(user: SafeUser, token: string) {
    this.user = user;
    this.token = token;
  }
}
