import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reserva } from '../models/reserva.model';
import { Cliente } from '../models/clientes.model';
import { Hotel } from '../models/hotel.model';
import { QuartoReserva } from '../models/quartos-reserva.model';
import { Pagamento } from '../models/pagamento.model';

@Injectable()
export class ReservaService {
  constructor(
    @InjectModel(Reserva) private reservaModel: typeof Reserva,
  ) { }

  async findAll(filters: {
    customerId?: number;
    hotelId?: number;
    roomId?: number;
  }): Promise<Reserva[]> {
    const whereClause: any = {};

    if (filters.customerId) whereClause.customer_id = filters.customerId;
    if (filters.hotelId) whereClause.hotel_id = filters.hotelId;

    const includeClause: any = [
      { model: Cliente, required: false },
      { model: Hotel, required: false },
      { model: Pagamento, required: false },
    ];

    if (filters.roomId) {
      includeClause.push({
        model: QuartoReserva,
        where: { id: filters.roomId },
        required: true,
      });
    } else {
      includeClause.push({
        model: QuartoReserva,
        required: false,
      });
    }

    return this.reservaModel.findAll({
      where: whereClause,
      include: includeClause,
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(uuid: string): Promise<Reserva | null> {
    return this.reservaModel.findOne({
      where: { uuid },
      include: [
        { model: Cliente, required: false },
        { model: Hotel, required: false },
        { model: QuartoReserva, required: false },
        { model: Pagamento, required: false },
      ],
    });
  }

}
