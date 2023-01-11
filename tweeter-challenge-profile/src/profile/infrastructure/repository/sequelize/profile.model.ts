import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "profile",

})
export class ProfileModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

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
