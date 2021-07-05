import { SafeUser } from "./SafeUser";

export interface UserProfile {
  safeUser: SafeUser;
}

export class RealUserProfile implements UserProfile {
  readonly safeUser: SafeUser;

  constructor(safeUser: SafeUser) {
    this.safeUser = safeUser;
  }
}
