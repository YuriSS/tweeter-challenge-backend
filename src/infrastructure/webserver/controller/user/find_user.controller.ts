import { IdentifierAdapter } from "@shared/infrastructure/adapter/identifier/identifier.adapter";
import { UserRepository } from "@user/infrastructure/repository/user.repository";
import { FindUserUsecase } from "@user/usecase/find/find.user.usecase";
import { Request, Response } from "express";

export const findUserController = async (request: Request, response: Response) => {
  const repository = new UserRepository();
  const makeId = new IdentifierAdapter();
  const usecase = new FindUserUsecase(repository, makeId);

  const id = request.params.id;
  const output = await usecase.execute({ id });

  response.json(output);
}
