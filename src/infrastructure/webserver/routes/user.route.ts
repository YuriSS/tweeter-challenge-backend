import express, { Request, Response } from "express"
import { WebserverAdapterFactory } from "@shared/domain/adapter/webserver/webserver.adapter";
import { createUserController } from "@infrastructure/webserver/controller/user/create_user.controller";
import { findUserController } from "../controller/user/find_user.controller";

export const userRoute = express.Router();

const adapter = WebserverAdapterFactory.create<Request, Response>();

userRoute.post("/", adapter.adaptController(createUserController));
userRoute.get("/:id", adapter.adaptController(findUserController));
