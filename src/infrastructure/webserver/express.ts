import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { UserSequelizeModel } from "@user/infrastructure/repository/user.repository.model";
import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript";
import { userRoute } from "@infrastructure/webserver/routes/user.route";

export const app: Express = express();

app.use(express.json());
app.use("user", userRoute);

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false
});

sequelize.addModels([ UserSequelizeModel, ProfileSequelizeModel ])
sequelize.sync();
