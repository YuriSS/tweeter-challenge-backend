export class InvalidEmailError extends Error {
  public constructor(message?: string) {
    super(message || "Email not valid");
    this.name = "InvalidEmailError";
  }
}
