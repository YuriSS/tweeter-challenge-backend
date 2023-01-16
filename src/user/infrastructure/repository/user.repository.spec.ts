import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { Sequelize } from "sequelize-typescript";

describe("UserRepository", () => {
  const date = new Date();
  let sequelize: Sequelize;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(date);

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true}
    });
    sequelize.addModels([ProfileSequelizeModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
    jest.useRealTimers();
  });
});
