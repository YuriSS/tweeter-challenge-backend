"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const make_identifier_1 = require("@shared/infrastructure/implemantation/make_identifier/make_identifier");
const validator_impl_1 = require("@shared/infrastructure/implemantation/validator/validator.impl");
const user_repository_1 = require("@user/infrastructure/repository/user.repository");
const create_user_usecase_1 = require("@user/usecase/create/create.user.usecase");
const find_user_usecase_1 = require("@user/usecase/find/find.user.usecase");
const express_1 = __importDefault(require("express"));
exports.userRoute = express_1.default.Router();
exports.userRoute.post("/", async (request, response) => {
    const repository = new user_repository_1.UserRepository();
    const validator = new validator_impl_1.ValidatorImpl();
    const makeId = new make_identifier_1.MakeIdentifierImpl();
    const usecase = new create_user_usecase_1.CreateUserUsecase(repository, validator, makeId);
    try {
        const userInputDto = {
            username: request.body.username,
            password: request.body.password,
        };
        const output = await usecase.execute(userInputDto);
        response.send(output);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
exports.userRoute.get("/:id", async (request, response) => {
    const repository = new user_repository_1.UserRepository();
    const makeId = new make_identifier_1.MakeIdentifierImpl();
    const usecase = new find_user_usecase_1.FindUserUsecase(repository, makeId);
    try {
        const id = request.params.id;
        const output = usecase.execute({ id });
        response.json(output);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
