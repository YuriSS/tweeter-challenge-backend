import { NotFound } from "@shared/domain/errors/not_found/not_found.error";
import { Request, Response } from "express";

export const notFounController = async (request: Request, _: Response): Promise<void> => {
  throw new NotFound(request.path);
}

