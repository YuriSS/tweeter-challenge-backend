import { ProfileSequelizeModel } from "@profile/infrastructure/repository/sequelize/profile.repository.model";
import { UserModel } from "@user/domain/repository/user.repository";
import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "user",
})
export class UserSequelizeModel extends Model<UserModel> {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare username: string;

  @Column({ allowNull: false })
  declare password: string;

  @Column({ allowNull: false })
  declare email: string;

  @ForeignKey(() => ProfileSequelizeModel)
  @Column
  declare profileId: string;
}
