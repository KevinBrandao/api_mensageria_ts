import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';
import { Reserva } from './reserva.model';

@Table({ tableName: 'pagamento' })
export class Pagamento extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => Reserva)
  @Column
  booking_uuid: string;

  @BelongsTo(() => Reserva)
  reserva: Reserva;

  @Column
  method: string;

  @Column
  status: string;

  @Column
  transaction_id: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;

}
