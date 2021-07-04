export interface SafeUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  picture: string | null;
  isLoggedIn: boolean | null;
}

export class RealSafeUser implements SafeUser {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly username: string;
  readonly picture: string | null;
  readonly isLoggedIn: boolean | null;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    picture?: string,
    isLoggedIn?: boolean
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.picture = picture ?? null;
    this.isLoggedIn = isLoggedIn ?? null;
  }
}
