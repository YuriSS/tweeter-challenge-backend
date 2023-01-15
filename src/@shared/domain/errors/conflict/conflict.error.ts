
export class ConflictError extends Error {
  public constructor(conflictError: string) {
    super();
    this.message = conflictError;
  }
}
