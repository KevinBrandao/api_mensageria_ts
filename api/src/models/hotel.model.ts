import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';

@Table({ tableName: 'hotel' })
export class Hotel extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @Column
  name: string;

  @Column
  city: string;

  @Column
  state: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;

}
