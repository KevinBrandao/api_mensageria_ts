import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import { Cliente } from './clientes.model';
import { Hotel } from './hotel.model';
import { QuartoReserva } from './quartos-reserva.model';
import { Pagamento } from './pagamento.model';

@Table({ tableName: 'reserva' })
export class Reserva extends Model {
  @PrimaryKey
  @Column
  uuid: string;

  @Column
  type: string;

  @ForeignKey(() => Cliente)
  @Column
  customer_id: number;

  @BelongsTo(() => Cliente)
  cliente: Cliente;

  @ForeignKey(() => Hotel)
  @Column
  hotel_id: number;

  @BelongsTo(() => Hotel)
  hotel: Hotel;

  @HasMany(() => QuartoReserva)
  quartos_reservados: QuartoReserva[];

  @HasMany(() => Pagamento)
  pagamentos: Pagamento[];

  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @Column({ field: 'indexed_at' })
  declare indexedAt: Date;

  @UpdatedAt
  @Column({ field: 'indexed_at' })
  declare updatedAt: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    if (values.quartos_reservados) {
      values.quartos_reservados = values.quartos_reservados.map((q: QuartoReserva) =>
        typeof q.toJSON === 'function' ? q.toJSON() : q
      );
    }
    return values;
  }
}
