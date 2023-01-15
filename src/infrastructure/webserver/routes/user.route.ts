import { MakeIdentifierImpl } from "@shared/infrastructure/implemantation/make_identifier/make_identifier";
import { ValidatorImpl } from "@shared/infrastructure/implemantation/validator/validator.impl";
import { UserRepository } from "@user/infrastructure/repository/user.repository";
import { InputUserCreateDto } from "@user/usecase/create/create.user.usecase.type";
import { CreateUserUsecase } from "@user/usecase/create/create.user.usecase";
import { FindUserUsecase } from "@user/usecase/find/find.user.usecase";
import express, { Request, Response } from "express"
import { RequestErrorHandlerFactory } from "@shared/domain/errors/request_handler/request.handler.error";

export const userRoute = express.Router();

userRoute.post("/", async (request: Request, response: Response) => {
  const repository = new UserRepository();
  const validator = new ValidatorImpl();
  const makeId = new MakeIdentifierImpl();
  const usecase = new CreateUserUsecase(repository, validator, makeId);

  try {
    const userInputDto: InputUserCreateDto = {
      username: request.body.username,
      password: request.body.password,
    };

    const output = await usecase.execute(userInputDto);

    response.json(output);
  }
  catch(error) {
    RequestErrorHandlerFactory.create(response).defineError(error);
  }
});

userRoute.get("/:id", async (request: Request, response: Response) => {
  const repository = new UserRepository();
  const makeId = new MakeIdentifierImpl();
  const usecase = new FindUserUsecase(repository, makeId);

  try {
    const id = request.params.id;
    const output = await usecase.execute({ id });

    response.json(output);
  }
  catch(error) {
    RequestErrorHandlerFactory.create(response).defineError(error);
  }
});
