import { ResourceNotFoundError } from "@shared/domain/errors/resource_not_found/resource_not_found.error";
import { ValidationError } from "@shared/domain/errors/validation/validation.error";
import { Response } from "@shared/domain/data/webserver/response.type";
import { NotFound } from "@shared/domain/errors/not_found/not_found.error";
import { ConflictError } from "@shared/domain/errors/conflict/conflict.error";

export class ResponseErrorAdapter {
  public constructor(private response: Response) {}

  public defineError(error: unknown): Response {
    if (error instanceof ValidationError) {
      return this.response.status(400).json({ error: error.errors });
    } else if (
      error instanceof ResourceNotFoundError ||
      error instanceof NotFound
    ) {
      return this.response.status(404).json({ error: error.message });
    } else if (error instanceof ConflictError) {
      return this.response.status(409).json({ error: error.message });
    }
    return this.response.status(500).json({ error: error });
  }
}

export class ResponseErrorAdapterFactory {
  public static create(response: Response) {
    return new ResponseErrorAdapter(response);
  }
}
