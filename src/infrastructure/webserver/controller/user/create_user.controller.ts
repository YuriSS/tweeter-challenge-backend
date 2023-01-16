import { ProfileRepository } from "@profile/infrastructure/repository/sequelize/profile.repository";
import { IdentifierAdapter } from "@shared/infrastructure/adapter/identifier/identifier.adapter";
import { ValidatorAdapter } from "@shared/infrastructure/adapter/validator/validator.adapter";
import { UserRepository } from "@user/infrastructure/repository/user.repository";
import { CreateUserUsecase } from "@user/usecase/create/create.user.usecase";
import { InputUserCreateDto } from "@user/usecase/create/create.user.usecase.type";
import { Request, Response } from "express";

export const createUserController = async (request: Request, response: Response) => {
  const userRepository = new UserRepository();
  const profileRepository = new ProfileRepository();
  const validator = new ValidatorAdapter();
  const makeId = new IdentifierAdapter();
  const usecase = new CreateUserUsecase(userRepository, profileRepository, validator, makeId);

  const userInputDto: InputUserCreateDto = {
    email: request.body.email,
    username: request.body.username,
    password: request.body.password,
  };

  const output = await usecase.execute(userInputDto);

  response.json(output);
}
