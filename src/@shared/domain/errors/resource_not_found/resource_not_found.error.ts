export interface NotFoundFields {
  field: string;
  value: string;
  scope: string;
}

export class ResourceNotFoundError extends Error {
  public constructor(fields: NotFoundFields) {
    super();
    this.message = `${fields.field} with value ${fields.value} not found on ${fields.scope}`;
  }
}
