export class InvalidNameError extends Error {
  public constructor(message?: string) {
    super(message || "Name is not valid");
    this.name = "InvalidNameError";
  }
}
