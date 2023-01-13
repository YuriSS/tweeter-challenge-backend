import { ProfileModel } from "@profile/domain/repository/profile.repository";
import { UserSequelizeModel } from "@user/infrastructure/repository/user.repository.model";
import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "profile",

})
export class ProfileSequelizeModel extends Model<ProfileModel> {

  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => UserSequelizeModel)
  @Column({ allowNull: false })
  declare userId: string;

  @Column({ allowNull: false })
  declare firstName: string;

  @Column({ allowNull: false })
  declare lastName: string;

  @Column({ allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare biography: string;
}
