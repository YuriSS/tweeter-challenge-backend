export class InvalidUUIDError extends Error {
  public constructor(message?: string) {
    super(message || "ID must be a valid UUID");
    this.name = "InvalidUUIDError";
  }
}
