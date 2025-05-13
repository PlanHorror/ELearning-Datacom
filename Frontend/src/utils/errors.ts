export class AuthError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class CustomAuthError extends AuthError {
  type: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message?: any) {
    super();

    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type = "Email or Password invalid!";
}

export class InactiveAccountError extends AuthError {
  static type = "Account is inactive!";
}
