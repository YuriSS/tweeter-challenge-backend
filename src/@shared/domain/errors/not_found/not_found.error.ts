
export class NotFound extends Error {
  public constructor(path: string) {
    super();
    this.message = `${path} not found`;
  }
}
