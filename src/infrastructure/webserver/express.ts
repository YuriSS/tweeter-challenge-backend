import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { UserSequelizeModel } from "@user/infrastructure/repository/user.repository.model";
import express, { Express, Request, Response } from "express";
import { Sequelize } from "sequelize-typescript";
import { userRoute } from "@infrastructure/webserver/routes/user.route";
import { WebserverAdapterFactory } from "@shared/domain/adapter/webserver/webserver.adapter";
import { notFounController } from "./controller/not_found/not_found.controller";

export const app: Express = express();
const adapter = WebserverAdapterFactory.create<Request, Response>();

app.use(express.json());
app.use("/user", userRoute);

app.use((request, _, next) => {
  console.log(`[${request.method}] ${request.path}`);
  next();
});

app.use(adapter.adaptController(notFounController));

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

sequelize.addModels([UserSequelizeModel, ProfileSequelizeModel]);
sequelize.sync();
