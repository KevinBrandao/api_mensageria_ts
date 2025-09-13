import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';

@Table({ tableName: 'clientes' })
export class Cliente extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  document: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;

}
