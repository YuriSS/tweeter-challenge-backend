import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { UserSequelizeModel } from "@user/infrastructure/repository/user.repository.model";
import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript";
import { userRoute } from "@infrastructure/webserver/routes/user.route";
import { NotFound } from "@shared/domain/errors/not_found/not_found.error";
import { RequestErrorHandlerFactory } from "@shared/domain/errors/request_handler/request.handler.error";

export const app: Express = express();

app.use(express.json());
app.use("/user", userRoute);

app.use((request, _, next) => {
  console.log(`[${request.method}] ${request.path}`);
  next();
});

app.use((request, response) => {
  try {
    throw new NotFound(request.path);
  }
  catch(error) {
    console.log(error);
    RequestErrorHandlerFactory.create(response).defineError(error);
  }
});

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false
});

sequelize.addModels([ UserSequelizeModel, ProfileSequelizeModel ])
sequelize.sync();
