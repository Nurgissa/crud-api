export class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  cause?: any;

  constructor(error: ErrorWithCause<T>) {
    super();
    this.name = error.name;
    this.message = error.message;
    this.cause = error.cause;
  }
}

interface ErrorWithCause<T> {
  name: T;
  message: string;
  cause?: any;
}

export class UserError extends ErrorBase<"NOT_FOUND" | "MALFORMED_INPUT"> {}
