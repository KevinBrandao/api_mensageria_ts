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

@Table({ tableName: 'quartos_reserva' })
export class QuartoReserva extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => Reserva)
  @Column
  booking_uuid: String;

  @BelongsTo(() => Reserva)
  reserva: Reserva;

  @Column
  number_of_days: number;

  @Column
  checkin_date: Date;

  @Column
  checkout_date: Date;
 
  @Column
  category_name: String;

  @Column
  room_number: String;

  @Column
  daily_rate: number;

  @Column
  status: String;

  @Column
  guests: number;

  @Column
  breakfast_included: boolean;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;
}
